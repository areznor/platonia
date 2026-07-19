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
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      launchAutoHide: false,
      backgroundColor: "#0b1624",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0b1624",
    },
  },
};

export default config;
