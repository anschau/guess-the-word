import { defineMessages } from 'react-intl'
import type { NoMessageValues } from 'react-intl'

type MessageValues = {
  winner: { playerName: string }
  scorePoints: { points: number }
} & Record<
  | 'title'
  | 'tie'
  | 'champion'
  | 'translation'
  | 'ranking'
  | 'playAgain'
  | 'menu'
  | 'scoreOnePoint'
  | 'empty',
  NoMessageValues
>

const screenId = 'finalScoreScreen'

export default defineMessages<MessageValues>({
  title: { id: `${screenId}.title`, defaultMessage: 'Partida concluída!' },
  winner: { id: `${screenId}.winner`, defaultMessage: '{playerName}\nvenceu!' },
  tie: { id: `${screenId}.tie`, defaultMessage: 'Deu empate!' },
  champion: {
    id: `${screenId}.champion`,
    defaultMessage: 'Iú ár dê tchêmpien',
  },
  translation: {
    id: `${screenId}.translation`,
    defaultMessage: '(Você é o campeão)',
  },
  ranking: { id: `${screenId}.ranking`, defaultMessage: 'Classificação final' },
  scorePoints: {
    id: `${screenId}.scorePoints`,
    defaultMessage: '{points} pontos',
  },
  scoreOnePoint: {
    id: `${screenId}.scoreOnePoint`,
    defaultMessage: '1 ponto',
  },
  playAgain: { id: `${screenId}.playAgain`, defaultMessage: 'Jogar novamente' },
  menu: { id: `${screenId}.menu`, defaultMessage: 'Voltar ao menu' },
  empty: {
    id: `${screenId}.empty`,
    defaultMessage: 'Resultado não encontrado.',
  },
})
