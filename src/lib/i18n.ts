export const LANGS = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "pt", flag: "🇧🇷", label: "Português" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
] as const;

export type LangCode = (typeof LANGS)[number]["code"];

const dict: Record<LangCode, Record<string, string>> = {
  pt: {
    "nav.enter": "Entrar",
    "nav.signup": "Criar passaporte",
    "nav.logout": "Sair",
    "nav.app": "Abrir app",
    "nav.privacy": "Política de privacidade",
    "hero.tag": "a terra do saber",
    "hero.lead":
      "Você está a um passo de sair da caverna. Tire seu passaporte e comece a aprender.",
    "hero.cta.passport": "Criar passaporte",
    "hero.cta.map": "Ver o mapa",
    "benefits.1.t": "Trilhas gamificadas",
    "benefits.1.d":
      "Lições curtas com corações, XP, ofensiva e Teste da Seção — no ritmo do Duolingo.",
    "benefits.2.t": "Biblioteca viva",
    "benefits.2.d":
      "Resumos e livros-jogo que revelam caminhos ocultos no mapa de Platonia.",
    "benefits.3.t": "Certificados",
    "benefits.3.d":
      "Complete uma região e baixe seu certificado da Academia de Platonia.",
    "map.title": "Mapa de Platonia",
    "map.sub":
      "Oito regiões do saber. Uma trilha por vez. Caminhos ocultos na Biblioteca.",
    "map.feature.t": "Microlearning com alma clássica",
    "map.feature.d":
      "Do passaporte à Ágora: ofensiva, dracmas, ligas e certificados. A Biblioteca conecta leitura e prática.",
    "map.cta": "Começar agora",
    "footer.tag": "platonia.academy · App educacional gratuito",
    "footer.line": "Saia da caverna. Tire agora mesmo o seu passaporte.",
    "auth.login.title": "Entrar em Platonia",
    "auth.login.sub": "Use o e-mail e a senha do seu passaporte.",
    "auth.signup.title": "Criar passaporte",
    "auth.signup.sub": "Bem-vindo, novo cidadão de Platonia!",
    "auth.name": "Nome",
    "auth.email": "E-mail",
    "auth.password": "Senha",
    "auth.submit.login": "Entrar",
    "auth.submit.signup": "Emitir passaporte",
    "auth.to.signup": "Ainda não tem passaporte? Criar conta",
    "auth.to.login": "Já sou cidadão — Entrar",
    "auth.error": "Não foi possível entrar. Verifique e-mail e senha.",
  },
  en: {
    "nav.enter": "Log in",
    "nav.signup": "Create passport",
    "nav.logout": "Log out",
    "nav.app": "Open app",
    "nav.privacy": "Privacy policy",
    "hero.tag": "the land of knowledge",
    "hero.lead":
      "You are one step from leaving the cave. Get your passport and start learning.",
    "hero.cta.passport": "Create passport",
    "hero.cta.map": "See the map",
    "benefits.1.t": "Gamified trails",
    "benefits.1.d":
      "Short lessons with hearts, XP, streaks and Section Tests — Duolingo-style.",
    "benefits.2.t": "Living library",
    "benefits.2.d":
      "Summaries and gamebooks that unlock hidden paths on Platonia’s map.",
    "benefits.3.t": "Certificates",
    "benefits.3.d":
      "Finish a region and download your Platonia Academy certificate.",
    "map.title": "Map of Platonia",
    "map.sub":
      "Eight knowledge regions. One trail at a time. Hidden paths in the Library.",
    "map.feature.t": "Microlearning with a classical soul",
    "map.feature.d":
      "From passport to Agora: streaks, coins, leagues and certificates.",
    "map.cta": "Start now",
    "footer.tag": "platonia.academy · Free educational app",
    "footer.line": "Leave the cave. Get your passport now.",
    "auth.login.title": "Enter Platonia",
    "auth.login.sub": "Use your passport email and password.",
    "auth.signup.title": "Create passport",
    "auth.signup.sub": "Welcome, new citizen of Platonia!",
    "auth.name": "Name",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.submit.login": "Log in",
    "auth.submit.signup": "Issue passport",
    "auth.to.signup": "No passport yet? Create account",
    "auth.to.login": "Already a citizen — Log in",
    "auth.error": "Could not sign in. Check email and password.",
  },
  fr: {
    "nav.enter": "Connexion",
    "nav.signup": "Créer un passeport",
    "nav.logout": "Déconnexion",
    "nav.app": "Ouvrir l’app",
    "nav.privacy": "Politique de confidentialité",
    "hero.tag": "la terre du savoir",
    "hero.lead":
      "Vous êtes à un pas de quitter la caverne. Prenez votre passeport et apprenez.",
    "hero.cta.passport": "Créer un passeport",
    "hero.cta.map": "Voir la carte",
    "benefits.1.t": "Parcours ludiques",
    "benefits.1.d":
      "Leçons courtes avec cœurs, XP, séries et tests — façon Duolingo.",
    "benefits.2.t": "Bibliothèque vivante",
    "benefits.2.d":
      "Résumés et livres-jeux qui révèlent des chemins secrets sur la carte.",
    "benefits.3.t": "Certificats",
    "benefits.3.d":
      "Terminez une région et téléchargez votre certificat.",
    "map.title": "Carte de Platonia",
    "map.sub":
      "Huit régions du savoir. Un parcours à la fois. Chemins cachés à la Bibliothèque.",
    "map.feature.t": "Microlearning à l’âme classique",
    "map.feature.d":
      "Du passeport à l’Agora : séries, pièces, ligues et certificats.",
    "map.cta": "Commencer",
    "footer.tag": "platonia.academy · App éducative gratuite",
    "footer.line": "Sortez de la caverne. Prenez votre passeport.",
    "auth.login.title": "Entrer dans Platonia",
    "auth.login.sub": "Utilisez l’e-mail et le mot de passe de votre passeport.",
    "auth.signup.title": "Créer un passeport",
    "auth.signup.sub": "Bienvenue, nouveau citoyen de Platonia !",
    "auth.name": "Nom",
    "auth.email": "E-mail",
    "auth.password": "Mot de passe",
    "auth.submit.login": "Connexion",
    "auth.submit.signup": "Émettre le passeport",
    "auth.to.signup": "Pas encore de passeport ? Créer un compte",
    "auth.to.login": "Déjà citoyen — Connexion",
    "auth.error": "Connexion impossible. Vérifiez e-mail et mot de passe.",
  },
  es: {
    "nav.enter": "Entrar",
    "nav.signup": "Crear pasaporte",
    "nav.logout": "Salir",
    "nav.app": "Abrir app",
    "nav.privacy": "Política de privacidad",
    "hero.tag": "la tierra del saber",
    "hero.lead":
      "Estás a un paso de salir de la caverna. Saca tu pasaporte y empieza a aprender.",
    "hero.cta.passport": "Crear pasaporte",
    "hero.cta.map": "Ver el mapa",
    "benefits.1.t": "Rutas gamificadas",
    "benefits.1.d":
      "Lecciones cortas con corazones, XP, rachas y exámenes — estilo Duolingo.",
    "benefits.2.t": "Biblioteca viva",
    "benefits.2.d":
      "Resúmenes y libros-juego que revelan caminos ocultos en el mapa.",
    "benefits.3.t": "Certificados",
    "benefits.3.d":
      "Completa una región y descarga tu certificado.",
    "map.title": "Mapa de Platonia",
    "map.sub":
      "Ocho regiones del saber. Una ruta a la vez. Caminos ocultos en la Biblioteca.",
    "map.feature.t": "Microlearning con alma clásica",
    "map.feature.d":
      "Del pasaporte al Ágora: rachas, monedas, ligas y certificados.",
    "map.cta": "Empezar ahora",
    "footer.tag": "platonia.academy · App educativa gratuita",
    "footer.line": "Sal de la caverna. Saca tu pasaporte ahora.",
    "auth.login.title": "Entrar en Platonia",
    "auth.login.sub": "Usa el correo y la contraseña de tu pasaporte.",
    "auth.signup.title": "Crear pasaporte",
    "auth.signup.sub": "¡Bienvenido, nuevo ciudadano de Platonia!",
    "auth.name": "Nombre",
    "auth.email": "Correo",
    "auth.password": "Contraseña",
    "auth.submit.login": "Entrar",
    "auth.submit.signup": "Emitir pasaporte",
    "auth.to.signup": "¿Aún no tienes pasaporte? Crear cuenta",
    "auth.to.login": "Ya soy ciudadano — Entrar",
    "auth.error": "No se pudo entrar. Revisa correo y contraseña.",
  },
  it: {
    "nav.enter": "Accedi",
    "nav.signup": "Crea passaporto",
    "nav.logout": "Esci",
    "nav.app": "Apri app",
    "nav.privacy": "Informativa sulla privacy",
    "hero.tag": "la terra del sapere",
    "hero.lead":
      "Sei a un passo dall’uscire dalla caverna. Prendi il passaporto e inizia a imparare.",
    "hero.cta.passport": "Crea passaporto",
    "hero.cta.map": "Vedi la mappa",
    "benefits.1.t": "Percorsi gamificati",
    "benefits.1.d":
      "Lezioni brevi con cuori, XP, serie e test — stile Duolingo.",
    "benefits.2.t": "Biblioteca viva",
    "benefits.2.d":
      "Riassunti e libri-gioco che svelano sentieri nascosti sulla mappa.",
    "benefits.3.t": "Certificati",
    "benefits.3.d":
      "Completa una regione e scarica il certificato.",
    "map.title": "Mappa di Platonia",
    "map.sub":
      "Otto regioni del sapere. Un percorso alla volta. Sentieri nascosti in Biblioteca.",
    "map.feature.t": "Microlearning con anima classica",
    "map.feature.d":
      "Dal passaporto all’Agorà: serie, monete, leghe e certificati.",
    "map.cta": "Inizia ora",
    "footer.tag": "platonia.academy · App educativa gratuita",
    "footer.line": "Esci dalla caverna. Prendi subito il passaporto.",
    "auth.login.title": "Entra in Platonia",
    "auth.login.sub": "Usa email e password del passaporto.",
    "auth.signup.title": "Crea passaporto",
    "auth.signup.sub": "Benvenuto, nuovo cittadino di Platonia!",
    "auth.name": "Nome",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.submit.login": "Accedi",
    "auth.submit.signup": "Emetti passaporto",
    "auth.to.signup": "Non hai ancora un passaporto? Crea account",
    "auth.to.login": "Sono già cittadino — Accedi",
    "auth.error": "Accesso non riuscito. Controlla email e password.",
  },
  de: {
    "nav.enter": "Anmelden",
    "nav.signup": "Pass erstellen",
    "nav.logout": "Abmelden",
    "nav.app": "App öffnen",
    "nav.privacy": "Datenschutz",
    "hero.tag": "das land des wissens",
    "hero.lead":
      "Du bist einen Schritt vom Verlassen der Höhle entfernt. Hol deinen Pass und lerne.",
    "hero.cta.passport": "Pass erstellen",
    "hero.cta.map": "Karte ansehen",
    "benefits.1.t": "Gamifizierte Pfade",
    "benefits.1.d":
      "Kurze Lektionen mit Herzen, XP, Serien und Tests — im Duolingo-Stil.",
    "benefits.2.t": "Lebendige Bibliothek",
    "benefits.2.d":
      "Zusammenfassungen und Spielbücher öffnen geheime Wege auf der Karte.",
    "benefits.3.t": "Zertifikate",
    "benefits.3.d":
      "Schließe eine Region ab und lade dein Zertifikat herunter.",
    "map.title": "Karte von Platonia",
    "map.sub":
      "Acht Wissensregionen. Ein Pfad nach dem anderen. Geheime Wege in der Bibliothek.",
    "map.feature.t": "Microlearning mit klassischer Seele",
    "map.feature.d":
      "Vom Pass zur Agora: Serien, Münzen, Ligen und Zertifikate.",
    "map.cta": "Jetzt starten",
    "footer.tag": "platonia.academy · Kostenlose Lern-App",
    "footer.line": "Verlasse die Höhle. Hol jetzt deinen Pass.",
    "auth.login.title": "Platonia betreten",
    "auth.login.sub": "Nutze E-Mail und Passwort deines Passes.",
    "auth.signup.title": "Pass erstellen",
    "auth.signup.sub": "Willkommen, neuer Bürger von Platonia!",
    "auth.name": "Name",
    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.submit.login": "Anmelden",
    "auth.submit.signup": "Pass ausstellen",
    "auth.to.signup": "Noch keinen Pass? Konto erstellen",
    "auth.to.login": "Schon Bürger — Anmelden",
    "auth.error": "Anmeldung fehlgeschlagen. E-Mail und Passwort prüfen.",
  },
};

export function t(lang: LangCode, key: string) {
  return dict[lang]?.[key] ?? dict.en[key] ?? dict.pt[key] ?? key;
}

export const STORAGE_KEY = "platonia_lang";
