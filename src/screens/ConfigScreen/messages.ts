import { defineMessages } from 'react-intl'
import type { NoMessageValues } from 'react-intl'

type MessageValues = {
  roundsValue: { rounds: number }
} & Record<
  | 'title'
  | 'back'
  | 'rounds'
  | 'decrease'
  | 'increase'
  | 'save'
  | 'cancel'
  | 'defaultPlayers',
  NoMessageValues
>

const screenId = 'configScreen'

export default defineMessages<MessageValues>({
  title: { id: `${screenId}.title`, defaultMessage: 'Configurações' },
  back: { id: `${screenId}.back`, defaultMessage: 'Voltar' },
  rounds: { id: `${screenId}.rounds`, defaultMessage: 'Número de turnos' },
  roundsValue: {
    id: `${screenId}.roundsValue`,
    defaultMessage: 'Número de turnos: {rounds}',
  },
  decrease: { id: `${screenId}.decrease`, defaultMessage: 'Diminuir turnos' },
  increase: { id: `${screenId}.increase`, defaultMessage: 'Aumentar turnos' },
  save: { id: `${screenId}.save`, defaultMessage: 'Salvar' },
  cancel: { id: `${screenId}.cancel`, defaultMessage: 'Cancelar' },
  defaultPlayers: {
    id: `${screenId}.defaultPlayers`,
    defaultMessage: 'Jogadores Padrão',
  },
})
