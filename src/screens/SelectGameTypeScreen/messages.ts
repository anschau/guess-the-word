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

const screenId = 'selectGameType'

export default defineMessages<MessageValues>({
  title: {
    id: `${screenId}.title`,
    defaultMessage: 'Como vocês\nquerem jogar?',
  },
  easy: { id: `${screenId}.easy`, defaultMessage: gameTypes.easy.title },
  easyDescription: {
    id: `${screenId}.easyDescription`,
    defaultMessage: gameTypes.easy.description,
  },
  medium: { id: `${screenId}.medium`, defaultMessage: gameTypes.medium.title },
  mediumDescription: {
    id: `${screenId}.mediumDescription`,
    defaultMessage: gameTypes.medium.description,
  },
  hard: { id: `${screenId}.hard`, defaultMessage: gameTypes.hard.title },
  hardDescription: {
    id: `${screenId}.hardDescription`,
    defaultMessage: gameTypes.hard.description,
  },
  summary: {
    id: `${screenId}.summary`,
    defaultMessage:
      '{players} participantes · {rounds} rodadas · {words} palavras',
  },
  start: {
    id: `${screenId}.start`,
    defaultMessage: 'Começar partida',
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
