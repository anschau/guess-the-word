import { defineMessages } from 'react-intl'
import type { NoMessageValues } from 'react-intl'

type MessageValues = {
  participant: { number: number }
} & Record<
  | 'back'
  | 'title'
  | 'subtitle'
  | 'add'
  | 'next'
  | 'save'
  | 'defaultPlayers'
  | 'required'
  | 'comingSoonTitle'
  | 'comingSoonText',
  NoMessageValues
>

const screenId = 'selectPlayersScreen'

export default defineMessages<MessageValues>({
  back: { id: `${screenId}.back`, defaultMessage: 'Voltar' },
  title: {
    id: `${screenId}.title`,
    defaultMessage: 'Quem vai jogar?',
  },
  subtitle: {
    id: `${screenId}.subtitle`,
    defaultMessage: 'Adicione os nomes de quem está na brincadeira.',
  },
  participant: {
    id: `${screenId}.participant`,
    defaultMessage: 'Participante {number}',
  },
  add: {
    id: `${screenId}.add`,
    defaultMessage: 'Adicionar participante',
  },
  next: { id: `${screenId}.next`, defaultMessage: 'Avançar' },
  save: { id: `${screenId}.save`, defaultMessage: 'Salvar' },
  defaultPlayers: {
    id: `${screenId}.defaultPlayers`,
    defaultMessage: 'Jogadores Padrão',
  },
  required: {
    id: `${screenId}.required`,
    defaultMessage:
      'Preencha o nome de pelo menos dois participantes para avançar.',
  },
  comingSoonTitle: {
    id: `${screenId}.comingSoonTitle`,
    defaultMessage: 'Participantes prontos!',
  },
  comingSoonText: {
    id: `${screenId}.comingSoonText`,
    defaultMessage: 'A próxima etapa da partida estará disponível em breve.',
  },
})
