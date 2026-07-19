import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "academy.platonia.app",
  appName: "Platonia",
  webDir: "www",
  server: {
    androidScheme: "https",
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
