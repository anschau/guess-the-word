import { defineMessages } from 'react-intl'
import type { NoMessageValues } from 'react-intl'
import { gameTypes } from '../../models/GameType'

type MessageValues = {
  summary: { players: number; rounds: number; words: number }
} & Record<
  | 'title'
  | 'easy'
  | 'easyDescription'
  | 'medium'
  | 'mediumDescription'
  | 'hard'
  | 'hardDescription'
  | 'start'
  | 'comingSoonTitle'
  | 'comingSoonText',
  NoMessageValues
>

export default defineMessages<MessageValues>({
  title: {
    id: 'selectGameType.title',
    defaultMessage: 'Como vocês\nquerem jogar?',
  },
  easy: { id: 'selectGameType.easy', defaultMessage: gameTypes.easy.title },
  easyDescription: {
    id: 'selectGameType.easyDescription',
    defaultMessage: gameTypes.easy.description,
  },
  medium: { id: 'selectGameType.medium', defaultMessage: gameTypes.medium.title },
  mediumDescription: {
    id: 'selectGameType.mediumDescription',
    defaultMessage: gameTypes.medium.description,
  },
  hard: { id: 'selectGameType.hard', defaultMessage: gameTypes.hard.title },
  hardDescription: {
    id: 'selectGameType.hardDescription',
    defaultMessage: gameTypes.hard.description,
  },
  summary: {
    id: 'selectGameType.summary',
    defaultMessage:
      '{players} participantes · {rounds} rodadas · {words} palavras',
  },
  start: {
    id: 'selectGameType.start',
    defaultMessage: 'Começar partida',
  },
  comingSoonTitle: {
    id: 'selectGameType.comingSoonTitle',
    defaultMessage: 'Tudo pronto!',
  },
  comingSoonText: {
    id: 'selectGameType.comingSoonText',
    defaultMessage: 'A próxima etapa da partida estará disponível em breve.',
  },
})
