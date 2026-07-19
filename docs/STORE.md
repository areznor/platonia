# Publicação nas lojas — Platonia (Fase 3)

## Pré-requisitos

| Item | Android | iOS |
|------|---------|-----|
| Conta | [Google Play Console](https://play.google.com/console) (taxa única) | [Apple Developer](https://developer.apple.com) (~US$ 99/ano) |
| Máquina | Windows/Mac/Linux + Android Studio | **somente Mac** + Xcode |
| Keystore / certificados | `platonia-release.keystore` | Signing no Xcode / App Store Connect |
| Privacidade | URL pública (já em `/privacidade`) | mesma URL |

URL sugerida de privacidade (após deploy do site):  
`https://platonia.academy/privacidade`

---

## Android — checklist

### 1. Ícones e splash

```bash
npm run assets:generate
```

Isso cria `assets/icon.png` + `splash.png` e aplica nos `mipmap`/`drawable` do Android.

### 2. Keystore de release (uma vez)

No terminal, pasta `android/`:

```bash
keytool -genkeypair -v -keystore platonia-release.keystore -alias platonia -keyalg RSA -keysize 2048 -validity 10000
```

```bash
copy keystore.properties.example keystore.properties
```

Edite `keystore.properties` com as senhas. **Não commite** `.keystore` nem `keystore.properties`. Faça backup seguro.

### 3. Gerar o AAB

Com Android Studio instalado (SDK + JDK):

```bash
npm run cap:sync
npm run build:aab
```

O arquivo sai em:  
`android/app/build/outputs/bundle/release/app-release.aab`

Ou no Android Studio: **Build → Generate Signed Bundle / APK → Android App Bundle**.

### 4. Play Console

1. Criar app **Platonia** (ou Platonia Academy)
2. Pacote: `academy.platonia.app`
3. Preencher ficha: descrição curta/longa, capturas (telefone), ícone 512×512
4. Classificação de conteúdo (questionário)
5. Política de privacidade: URL `/privacidade`
6. Enviar o AAB em teste interno → produção

### Versão atual

- `versionName`: **2.0.0**
- `versionCode`: **2** (incremente a cada upload na Play Store)

---

## iOS — checklist (Mac)

```bash
npm run cap:add:ios   # uma vez
npm run assets:generate
npm run cap:ios
```

No Xcode: Team/signing, ícones, Archive → TestFlight → App Store.  
Use a mesma política de privacidade.

---

## Textos da ficha (sugestão)

**Nome:** Platonia  
**Subtítulo / curta:** A terra do saber — aprenda com trilhas e certificados.  
**Descrição longa:** use o texto do README + regiões do mapa, biblioteca e certificados.
