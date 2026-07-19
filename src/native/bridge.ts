import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { Share } from "@capacitor/share";
import { App } from "@capacitor/app";

type NavHandler = () => boolean | void;

const api = {
  isNative: () => Capacitor.isNativePlatform(),

  async init() {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: "#0b1624" });
    } catch {
      /* web / unsupported */
    }

    try {
      await SplashScreen.hide({ fadeOutDuration: 400 });
    } catch {
      /* already hidden */
    }

    App.addListener("backButton", ({ canGoBack }) => {
      const handled = window.PlatoniaNav?.onBack?.();
      if (handled) return;
      if (canGoBack) window.history.back();
      else App.exitApp();
    });
  },

  async hapticOk() {
    if (!Capacitor.isNativePlatform()) return;
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch {
        /* no vibrator */
      }
    }
  },

  async hapticErro() {
    if (!Capacitor.isNativePlatform()) return;
    try {
      await Haptics.notification({ type: NotificationType.Error });
    } catch {
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch {
        /* no vibrator */
      }
    }
  },

  async hapticVitoria() {
    if (!Capacitor.isNativePlatform()) return;
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch {
      /* no vibrator */
    }
  },

  async compartilharCertificado(dataUrl: string, titulo: string) {
    const nome = `certificado-platonia.png`;

    if (Capacitor.isNativePlatform()) {
      try {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], nome, { type: "image/png" });

        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: titulo,
            text: "Meu certificado da Academia de Platonia 🏛️",
          });
          return true;
        }

        await Share.share({
          title: titulo,
          text: "Meu certificado da Academia de Platonia — platonia.academy",
          dialogTitle: "Compartilhar certificado",
        });
        return true;
      } catch (e) {
        if ((e as Error)?.name === "AbortError") return false;
        console.warn("Share nativo falhou", e);
      }
    }

    try {
      if (navigator.share) {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], nome, { type: "image/png" });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], title: titulo });
          return true;
        }
        await navigator.share({
          title: titulo,
          text: "Meu certificado da Academia de Platonia — platonia.academy",
        });
        return true;
      }
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return false;
    }
    return false;
  },
};

declare global {
  interface Window {
    PlatoniaNative: typeof api;
    PlatoniaNav?: { onBack?: NavHandler };
  }
}

window.PlatoniaNative = api;

void api.init();
