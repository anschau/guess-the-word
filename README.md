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

As cores ficam em `src/theme/theme.ts`. As fontes, variantes de texto e ajustes
para telas compactas ficam em `src/theme/typography.ts`.

Nos componentes com `styled-components/native`, use `getTextVariantStyles`:

```tsx
import styled from 'styled-components/native'
import { theme } from './src/theme/theme'
import { getTextVariantStyles, TextVariant } from './src/theme/typography'

const Title = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TextVariant.H4, $compact),
  color: theme.colors.text,
}))
```

Passe o resultado de `useCompact`, de `src/config/config.ts`, para `$compact`.
O segundo argumento de `getTextVariantStyles` é opcional e assume `false`.
Esse helper adapta `lineHeight` para o formato usado por styled-components.
Para a prop `style` de um `Text` nativo, use `TextVariantStyles[TextVariant.H4]`,
que mantém os valores numéricos do React Native.

O peso Bold já faz parte do arquivo Motion Control; não é necessário adicionar
`fontWeight`.

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
