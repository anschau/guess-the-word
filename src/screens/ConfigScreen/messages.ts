import { defineMessages } from 'react-intl'

const screenId = 'configScreen'

export default defineMessages({
  title: { id: `${screenId}.title`, defaultMessage: 'Configurações' },
  back: { id: `${screenId}.back`, defaultMessage: 'Voltar' },
  defaultPlayers: {
    id: `${screenId}.defaultPlayers`,
    defaultMessage: 'Jogadores Padrão',
  },
})
