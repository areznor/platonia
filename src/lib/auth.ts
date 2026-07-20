import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUsers, mongoConfigured } from "./mongodb";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/entrar",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (!mongoConfigured()) {
          throw new Error("Servidor sem banco configurado (MONGODB_URI)");
        }
        const users = await getUsers();
        const user = await users.findOne({
          email: credentials.email.toLowerCase().trim(),
        });
        if (!user?.passwordHash) return null;
        const ok = await compare(credentials.password, user.passwordHash);
        if (!ok) return null;
        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          image: user.avatar || null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.picture = user.image;
      }
      if (trigger === "update" && session?.user) {
        if (session.user.name) token.name = session.user.name;
        if (session.user.image !== undefined) token.picture = session.user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        session.user.image = (token.picture as string) || null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
