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
import { getTextVariantStyles, TypographyVariant } from './src/theme/typography'

const Title = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.H4, $compact),
  color: theme.colors.text,
}))
```

Passe o resultado de `useCompact`, de `src/config/config.ts`, para `$compact`.
O segundo argumento de `getTextVariantStyles` é opcional e assume `false`.
Esse helper adapta `lineHeight` para o formato usado por styled-components.
Para a prop `style` de um `Text` nativo, use `TypographyVariantStyles[TypographyVariant.H4]`,
que mantém os valores numéricos do React Native.

O peso Bold já faz parte do arquivo Motion Control; não é necessário adicionar
`fontWeight`.

Os avisos originais estão em `assets/font-licenses` e são incluídos nos apps.
O site e o README do autor indicam OFL para Motion Control, mas os metadados do
arquivo ainda dizem “FontStruct Non-Commercial License”; essa divergência foi
preservada, sem modificar a fonte.

## Dados locais do jogo

Os repositórios usam Zustand com `persist` e uma instância do AsyncStorage v3
(`guess-the-word`). O aplicativo aguarda a restauração antes de abrir as telas;
se a leitura falhar, oferece uma nova tentativa sem sobrescrever os dados salvos.

- `usePlayersRepository`: nomes confirmados na seleção de jogadores.
- `usePreferencesRepository`: última dificuldade selecionada.
- `useGameRepository`: progresso, maior pontuação individual por dificuldade e
  as últimas 20 partidas concluídas, da mais recente para a mais antiga.

A tela de partida ainda não está implementada. Quando existir, deve chamar
`saveGame` com o estado completo após cada mudança (rodada, pontos, jogador da
vez e IDs das palavras usadas), `finishGame` ao concluir ou `discardGame` ao
abandonar. `currentGame` contém o progresso a retomar. Cada partida e jogador
deve receber um ID estável; datas usam o formato ISO. Concluir uma partida
atualiza progresso, histórico e recordes na mesma entrada persistida.

As entradas têm versão 1. Alterações futuras no formato devem incluir uma
migração no `persist`. Perguntas e respostas não fazem parte dessa persistência.
Os dados são locais: não há sincronização ou backup em servidor.

## Verificações

```sh
npm run lint
npx tsc --noEmit
npm test -- --runInBand
```

O código inicial está em `App.tsx`. O nome do pacote e o título do aplicativo são `guess-the-word`; o identificador de registro nativo é `GuessTheWord`.

Documentação: [React Native sem framework](https://reactnative.dev/docs/getting-started-without-a-framework).
