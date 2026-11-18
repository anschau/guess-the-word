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

## Publicação Android

Use **AAB** para enviar à Google Play Store e **APK** para instalar diretamente
no celular. Os comandos abaixo usam PowerShell, na raiz do projeto, com os
requisitos Android já instalados.

### 1. Preparar versão e assinatura

Em `android/app/build.gradle`, confira o `applicationId` (atualmente
`com.guesstheword.anschau`) antes da primeira publicação: ele identifica o aplicativo na
loja e deve permanecer igual nas atualizações. Aumente `versionCode` a cada envio
à Play Store e ajuste `versionName` para a versão exibida ao usuário. A versão do `package.json` não altera esses campos.

**A configuração atual assina o release com a chave de debug. Antes de distribuir,
configure uma chave própria conforme os passos abaixo.**

Gere a chave uma única vez, a partir da raiz do projeto (o `keytool` vem com o JDK):

```powershell
keytool -genkeypair -v -storetype PKCS12 -keystore android/app/guess-the-word-release.keystore -alias guess-the-word -keyalg RSA -keysize 2048 -validity 10000
```

Informe os dados e a senha solicitados. Guarde uma cópia segura da chave, do alias
e da senha: eles serão necessários para assinar futuras versões do APK.
O `.gitignore` já ignora `*.keystore`, exceto a chave de debug.

Adicione estas propriedades ao arquivo **do usuário**
`%USERPROFILE%\.gradle\gradle.properties` (no macOS/Linux,
`~/.gradle/gradle.properties`), criando a pasta/arquivo se necessário.
Substitua os valores de senha; não coloque credenciais no arquivo versionado
`android/gradle.properties`.

```properties
GUESS_THE_WORD_STORE_FILE=guess-the-word-release.keystore
GUESS_THE_WORD_KEY_ALIAS=guess-the-word
GUESS_THE_WORD_STORE_PASSWORD=SUA_SENHA
GUESS_THE_WORD_KEY_PASSWORD=SUA_SENHA
```

Para a chave PKCS12 gerada acima, use a mesma senha nos dois campos.
Em `android/app/build.gradle`, acrescente este bloco dentro de `signingConfigs`,
ao lado do bloco `debug` existente:

```groovy
release {
    storeFile file(GUESS_THE_WORD_STORE_FILE)
    storePassword GUESS_THE_WORD_STORE_PASSWORD
    keyAlias GUESS_THE_WORD_KEY_ALIAS
    keyPassword GUESS_THE_WORD_KEY_PASSWORD
}
```

Após essa alteração, as propriedades e a chave precisam estar disponíveis em
toda máquina que executar o Gradle, inclusive no CI.

### 2. Gerar AAB e publicar na Play Store

Com a assinatura configurada, execute:

```powershell
npm ci
cd android
.\gradlew :app:bundleRelease
cd ..
```

Arquivo gerado: `android/app/build/outputs/bundle/release/app-release.aab`.
O AAB é destinado à loja e não pode ser instalado diretamente pelo gerenciador
de arquivos do celular.

1. Acesse o [Google Play Console](https://play.google.com/console), com uma conta
   de desenvolvedor, e crie o aplicativo (ou abra o já cadastrado).
2. Complete a ficha da loja e as declarações solicitadas no painel, incluindo
   imagens, classificação indicativa, segurança dos dados e política de privacidade.
3. Configure o **Play App Signing** no primeiro envio. A chave local pode ser
   usada como chave de upload; o Google assina os APKs entregues pela loja com a
   chave de assinatura do aplicativo.
4. Crie uma versão em **Teste interno**, envie o AAB, preencha as notas da versão
   e disponibilize-a aos testadores. Instale pela loja e valide o funcionamento.
5. Cumpra os requisitos de teste e de acesso à produção apresentados para sua
   conta. Depois crie ou promova a versão para **Produção**, escolha os países e
   envie para revisão/publicação.

Em cada atualização, aumente o `versionCode`, gere outro AAB e crie uma nova
versão. Consulte as exigências atuais de API de destino e as pendências no
Console antes de enviar.

### 3. Gerar APK para instalação manual

Use a mesma preparação de assinatura e versão da etapa 1. Na raiz do projeto:

```powershell
npm ci
cd android
.\gradlew :app:assembleRelease
cd ..
```

Arquivo gerado: `android/app/build/outputs/apk/release/app-release.apk`.
O build de release inclui o JavaScript e os assets; não precisa do Metro nem de
`npm start` para funcionar.

- **Pelo celular:** transfira o APK, abra-o e, quando solicitado pelo Android,
  permita a instalação de apps dessa origem (navegador ou gerenciador de arquivos).
- **Por USB:** habilite a depuração USB, autorize o computador e execute, na raiz:

  ```powershell
  adb devices
  adb install -r android/app/build/outputs/apk/release/app-release.apk
  ```

Para atualizar sem apagar os dados, mantenha o mesmo `applicationId` e a mesma
assinatura e aumente o `versionCode`. Uma instalação de debug ou da Play Store
pode ter outra assinatura; nesse caso, o Android recusará a atualização com esse
APK. Desinstalar a versão anterior permite instalar a nova, mas **apaga os dados
locais do jogo**. A chave de upload do Play não é necessariamente a chave que
assina o app instalado pela loja; planeje essa diferença se distribuir pelos
dois canais.

Antes de compartilhar, teste o APK de release em um aparelho real, com o Metro
desligado, incluindo abertura, navegação e persistência dos dados após reabrir.

Referências oficiais: [assinatura e publicação no React Native](https://reactnative.dev/docs/signed-apk-android),
[build pela linha de comando no Android](https://developer.android.com/build/building-cmdline)
e [preparação e lançamento de versões no Play Console](https://support.google.com/googleplay/android-developer/answer/9859348).

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
- `useGameTypeRepository`: objeto do tipo de jogo selecionado, com `id`
  (`easy`, `medium` ou `hard`), `title` e `description` (strings), acessado por
  `gameType` e atualizado com `setGameType`.
- `useGameRepository`: progresso, maior pontuação individual por dificuldade e
  as últimas 20 partidas concluídas, da mais recente para a mais antiga.
- `useWordRepository`: catálogo de palavras com três pistas por palavra,
  persistido na chave `words` (versão 1). `saveWord` adiciona ou atualiza por ID,
  `setWords` substitui a lista e `getWordsByGameType` filtra pela dificuldade.
  Os dois exemplos ficam em `src/data/initialWords.ts` e são usados quando não
  há catálogo salvo. Para ampliar um catálogo já salvo, use `saveWord`;
  alterações nos exemplos não sobrescrevem os dados existentes.

A tela de partida ainda não está implementada. Quando existir, deve chamar
`saveGame` com o estado completo após cada mudança (rodada, pontos, jogador da
vez e IDs das palavras usadas), `finishGame` ao concluir ou `discardGame` ao
abandonar. `currentGame` contém o progresso a retomar. Cada partida e jogador
deve receber um ID estável; datas usam o formato ISO. Concluir uma partida
atualiza progresso, histórico e recordes na mesma entrada persistida.

Jogadores e partidas usam versão 1. O repository de GameType usa versão 3 e
mantém a chave `preferences` para migrar as strings salvas nas versões 1 e 2
para objetos completos. Partidas e recordes continuam referenciando o ID.
Alterações futuras no formato devem incluir uma
migração no `persist`.
Os dados são locais: não há sincronização ou backup em servidor.

## Verificações

```sh
npm run lint
npx tsc --noEmit
npm test -- --runInBand
```

O código inicial está em `App.tsx`. O nome do pacote e o título do aplicativo são `guess-the-word`; o identificador de registro nativo é `GuessTheWord`.

Documentação: [React Native sem framework](https://reactnative.dev/docs/getting-started-without-a-framework).
