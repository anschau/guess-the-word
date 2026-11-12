# guess-the-word
Aprenda inglês com Guess The Word

Aplicativo Bare React Native 0.88.1 com TypeScript e projetos nativos Android e iOS.

## Requisitos

- Node.js `^22.13.0`, `^24.3.0` ou `>=26.0.0` e npm.
- Android: JDK 17, Android Studio, SDK Platform 37, Build Tools 37.0.0 e NDK 27.1.12297006. Configure `ANDROID_HOME` e um emulador ou dispositivo.
- iOS: macOS, Xcode, Ruby, Bundler e CocoaPods.

## Executar

```sh
npm ci
npm start
```

Em outro terminal, na raiz do projeto:

```sh
npm run android
```

Para iOS, em um Mac, instale as dependências nativas antes da primeira execução:

```sh
bundle install
cd ios
bundle exec pod install
cd ..
npm run ios
```

## Fontes

- Textos: [Motion Control Bold](https://www.1001fonts.com/motion-control-font.html).
- Títulos: [Ithaca](https://www.1001fonts.com/ithaca-font.html).

Os arquivos estão em `assets/fonts`, registrados no iOS e copiados para
`android/app/src/main/assets/fonts`. Recompile o app após instalar ou alterar fontes;
o Fast Refresh não atualiza recursos nativos.

Use os estilos de `src/theme/typography.ts` nas telas:

```tsx
import { Text } from 'react-native';
import { typography } from './src/theme/typography';

<Text style={typography.title}>Guess The Word</Text>;
<Text style={typography.text}>Aprenda inglês jogando.</Text>;
```

Também é possível usar `fonts.text` e `fonts.title` em `fontFamily`.
O peso Bold já faz parte do arquivo Motion Control; não é necessário adicionar
`fontWeight`. A tela padrão `NewAppScreen` pertence a uma dependência e não usa
esses estilos automaticamente.

Os avisos originais estão em `assets/font-licenses` e são incluídos nos apps.
O site e o README do autor indicam OFL para Motion Control, mas os metadados do
arquivo ainda dizem “FontStruct Non-Commercial License”; essa divergência foi
preservada, sem modificar a fonte.

## Verificações

```sh
npm run lint
npx tsc --noEmit
npm test -- --runInBand
```

O código inicial está em `App.tsx`. O nome do pacote e o título do aplicativo são `guess-the-word`; o identificador de registro nativo é `GuessTheWord`.

Documentação: [React Native sem framework](https://reactnative.dev/docs/getting-started-without-a-framework).
