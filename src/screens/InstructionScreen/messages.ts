import { defineMessages } from 'react-intl'

const screenId = 'instructionScreen'

export default defineMessages({
  title: { id: `${screenId}.title`, defaultMessage: 'Como jogar' },
  back: { id: `${screenId}.back`, defaultMessage: 'Voltar' },
  understood: { id: `${screenId}.understood`, defaultMessage: 'Entendi!' },
  gatherTitle: {
    id: `${screenId}.gatherTitle`,
    defaultMessage: '1. Reúna o grupo',
  },
  gatherText: {
    id: `${screenId}.gatherText`,
    defaultMessage: 'Cadastre os participantes e escolha o tipo de jogo.',
  },
  passTitle: {
    id: `${screenId}.passTitle`,
    defaultMessage: '2. Passe o celular',
  },
  passText: {
    id: `${screenId}.passText`,
    defaultMessage:
      'Na sua vez, veja a palavra secreta sem mostrar aos outros.',
  },
  cluesTitle: {
    id: `${screenId}.cluesTitle`,
    defaultMessage: '3. Leia as dicas em inglês',
  },
  cluesText: {
    id: `${screenId}.cluesText`,
    defaultMessage:
      'Leia uma dica de cada vez. Não diga a palavra secreta nem traduza as pistas.',
  },
  guessesTitle: {
    id: `${screenId}.guessesTitle`,
    defaultMessage: '4. Hora dos palpites',
  },
  guessesText: {
    id: `${screenId}.guessesText`,
    defaultMessage:
      'Cada pessoa pode dar um palpite por dica. A leitura pode ser repetida. O primeiro acerto encerra o turno.',
  },
  lastChanceTitle: {
    id: `${screenId}.lastChanceTitle`,
    defaultMessage: '5. Última chance',
  },
  lastChanceText: {
    id: `${screenId}.lastChanceText`,
    defaultMessage:
      'Na última dica, caso ninguém acerte, você pode explicar a palavra de outras formas em inglês. Os participantes podem dar quantos palpites quiserem.',
  },
  scoringTitle: {
    id: `${screenId}.scoringTitle`,
    defaultMessage: 'Como pontuar',
  },
  firstClue: {
    id: `${screenId}.firstClue`,
    defaultMessage: 'Primeira dica: <highlight>3 pontos</highlight>',
  },
  secondClue: {
    id: `${screenId}.secondClue`,
    defaultMessage: 'Segunda dica: <highlight>2 pontos</highlight>',
  },
  thirdClue: {
    id: `${screenId}.thirdClue`,
    defaultMessage: 'Terceira dica: <highlight>1 ponto</highlight>',
  },
  readerScore: {
    id: `${screenId}.readerScore`,
    defaultMessage:
      'Quem lê ganha 1 ponto quando alguém acerta. Se ninguém acertar, ninguém pontua.',
  },
  endingTitle: {
    id: `${screenId}.endingTitle`,
    defaultMessage: 'Quando termina?',
  },
  endingText: {
    id: `${screenId}.endingText`,
    defaultMessage:
      'São três rodadas. Em cada rodada, todos apresentam uma palavra. Vence quem somar mais pontos.',
  },
})
