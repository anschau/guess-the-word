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
  | 'required'
  | 'comingSoonTitle'
  | 'comingSoonText',
  NoMessageValues
>

export default defineMessages<MessageValues>({
  back: { id: 'selectPlayersScreen.back', defaultMessage: 'Voltar' },
  title: {
    id: 'selectPlayersScreen.title',
    defaultMessage: 'Quem vai jogar?',
  },
  subtitle: {
    id: 'selectPlayersScreen.subtitle',
    defaultMessage: 'Adicione os nomes de quem está na brincadeira.',
  },
  participant: {
    id: 'selectPlayersScreen.participant',
    defaultMessage: 'Participante {number}',
  },
  add: {
    id: 'selectPlayersScreen.add',
    defaultMessage: 'Adicionar participante',
  },
  next: { id: 'selectPlayersScreen.next', defaultMessage: 'Avançar' },
  required: {
    id: 'selectPlayersScreen.required',
    defaultMessage:
      'Preencha o nome de pelo menos dois participantes para avançar.',
  },
  comingSoonTitle: {
    id: 'selectPlayersScreen.comingSoonTitle',
    defaultMessage: 'Participantes prontos!',
  },
  comingSoonText: {
    id: 'selectPlayersScreen.comingSoonText',
    defaultMessage: 'A próxima etapa da partida estará disponível em breve.',
  },
})
