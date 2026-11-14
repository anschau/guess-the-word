import { defineMessages, type NoMessageValues } from 'react-intl'

type MessageValues = {
  points: { points: number }
} & Record<
  | 'current'
  | 'open'
  | 'close'
  | 'empty'
  | 'onePoint'
  | 'endGame'
  | 'confirmEnd'
  | 'cancel',
  NoMessageValues
>

export default defineMessages<MessageValues>({
  current: { id: 'gameScore.current', defaultMessage: 'Placar atual' },
  open: { id: 'gameScore.open', defaultMessage: 'Ver placar' },
  close: { id: 'gameScore.close', defaultMessage: 'Fechar' },
  endGame: { id: 'gameScore.endGame', defaultMessage: 'Encerrar jogo' },
  confirmEnd: {
    id: 'gameScore.confirmEnd',
    defaultMessage:
      'Deseja encerrar o jogo? O placar atual será salvo como resultado final.',
  },
  cancel: { id: 'gameScore.cancel', defaultMessage: 'Continuar jogando' },
  empty: {
    id: 'gameScore.empty',
    defaultMessage: 'Nenhum jogador encontrado.',
  },
  onePoint: { id: 'gameScore.onePoint', defaultMessage: '1 ponto' },
  points: { id: 'gameScore.points', defaultMessage: '{points} pontos' },
})
