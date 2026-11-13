import { defineMessages } from 'react-intl'
import type { NoMessageValues } from 'react-intl'

type MessageValues = {
  round: { round: number; totalRounds: number }
  turn: { playerName: string }
  player: { playerName: string }
} & Record<
  | 'roundLabel'
  | 'passPhone'
  | 'instructions'
  | 'confirm'
  | 'warning'
  | 'comingSoonTitle'
  | 'comingSoonText',
  NoMessageValues
>

const screenId = 'switchTurnScreen'

export default defineMessages<MessageValues>({
  roundLabel: { id: `${screenId}.roundLabel`, defaultMessage: 'Rodada' },
  round: {
    id: `${screenId}.round`,
    defaultMessage: '{round} de {totalRounds}',
  },
  turn: {
    id: `${screenId}.turn`,
    defaultMessage: 'Vez de\n{playerName}!',
  },
  passPhone: {
    id: `${screenId}.passPhone`,
    defaultMessage: 'Passe o celular para',
  },
  player: {
    id: `${screenId}.player`,
    defaultMessage: '{playerName}.',
  },
  instructions: {
    id: `${screenId}.instructions`,
    defaultMessage: 'Só ele pode ver a palavra\ne ler as dicas.',
  },
  confirm: {
    id: `${screenId}.confirm`,
    defaultMessage: 'Estou com o celular',
  },
  warning: {
    id: `${screenId}.warning`,
    defaultMessage: 'Não deixe os outros\nespiando!',
  },
  comingSoonTitle: {
    id: `${screenId}.comingSoonTitle`,
    defaultMessage: 'Tudo pronto!',
  },
  comingSoonText: {
    id: `${screenId}.comingSoonText`,
    defaultMessage: 'A próxima etapa da partida estará disponível em breve.',
  },
})
