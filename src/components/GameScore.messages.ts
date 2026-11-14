import { defineMessages, type NoMessageValues } from 'react-intl'

type MessageValues = {
  points: { points: number }
} & Record<'current' | 'open' | 'close' | 'empty' | 'onePoint', NoMessageValues>

export default defineMessages<MessageValues>({
  current: { id: 'gameScore.current', defaultMessage: 'Placar atual' },
  open: { id: 'gameScore.open', defaultMessage: 'Ver placar' },
  close: { id: 'gameScore.close', defaultMessage: 'Fechar' },
  empty: {
    id: 'gameScore.empty',
    defaultMessage: 'Nenhum jogador encontrado.',
  },
  onePoint: { id: 'gameScore.onePoint', defaultMessage: '1 ponto' },
  points: { id: 'gameScore.points', defaultMessage: '{points} pontos' },
})
