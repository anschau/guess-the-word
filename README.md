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

## Verificações

```sh
npm run lint
npx tsc --noEmit
npm test -- --runInBand
```

O código inicial está em `App.tsx`. O nome do pacote e o título do aplicativo são `guess-the-word`; o identificador de registro nativo é `GuessTheWord`.

Documentação: [React Native sem framework](https://reactnative.dev/docs/getting-started-without-a-framework).
