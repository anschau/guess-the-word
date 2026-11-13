import { defineMessages } from 'react-intl'
import type { NoMessageValues } from 'react-intl'

type MessageValues = {
  round: { round: number; totalRounds: number }
  clue: { clue: number }
  points: { points: number }
} & Record<
  | 'roundLabel'
  | 'turn'
  | 'secret'
  | 'instructions'
  | 'correct'
  | 'nextClue'
  | 'endTurn'
  | 'footer'
  | 'footerEnd'
  | 'winner'
  | 'cancel'
  | 'finished'
  | 'home'
  | 'onePoint'
  | 'empty',
  NoMessageValues
>

const screenId = 'guessTheWordScreen'

export default defineMessages<MessageValues>({
  roundLabel: { id: `${screenId}.roundLabel`, defaultMessage: 'Rodada' },
  round: {
    id: `${screenId}.round`,
    defaultMessage: '{round} de {totalRounds}',
  },
  turn: { id: `${screenId}.turn`, defaultMessage: 'Vez de' },
  secret: { id: `${screenId}.secret`, defaultMessage: 'Sua palavra secreta' },
  instructions: {
    id: `${screenId}.instructions`,
    defaultMessage: 'Leia apenas a dica em voz alta.',
  },
  clue: { id: `${screenId}.clue`, defaultMessage: 'DICA {clue} DE 3' },
  points: {
    id: `${screenId}.points`,
    defaultMessage:
      'Vale {points} pontos para quem acertar',
  },
  onePoint: {
    id: `${screenId}.onePoint`,
    defaultMessage: 'Vale 1 ponto para quem acertar',
  },
  correct: { id: `${screenId}.correct`, defaultMessage: 'Alguém acertou!' },
  nextClue: {
    id: `${screenId}.nextClue`,
    defaultMessage: 'Ninguém acertou ·\nPróxima dica',
  },
  endTurn: {
    id: `${screenId}.endTurn`,
    defaultMessage: 'Ninguém acertou ·\nEncerrar vez',
  },
  footer: {
    id: `${screenId}.footer`,
    defaultMessage:
      'Um palpite por pessoa nesta dica.\nVocê pode repetir a leitura.',
  },
  footerEnd: {
    id: `${screenId}.footerEnd`,
    defaultMessage:
      'Quantos palpites vocês quiserem, para fechar!',
  },
  winner: { id: `${screenId}.winner`, defaultMessage: 'Quem acertou?' },
  cancel: { id: `${screenId}.cancel`, defaultMessage: 'Voltar' },
  finished: {
    id: `${screenId}.finished`,
    defaultMessage: 'Partida finalizada!',
  },
  home: { id: `${screenId}.home`, defaultMessage: 'Voltar ao início' },
  empty: {
    id: `${screenId}.empty`,
    defaultMessage: 'Não há palavras disponíveis para esta dificuldade.',
  },
})
