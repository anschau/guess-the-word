import { defineMessages } from 'react-intl'
import type { NoMessageValues } from 'react-intl'

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
  easy: { id: 'selectGameType.easy', defaultMessage: 'Fácil' },
  easyDescription: {
    id: 'selectGameType.easyDescription',
    defaultMessage: 'Palavras comuns e frases simples.',
  },
  medium: { id: 'selectGameType.medium', defaultMessage: 'Médio' },
  mediumDescription: {
    id: 'selectGameType.mediumDescription',
    defaultMessage: 'Vocabulário mais variado.',
  },
  hard: { id: 'selectGameType.hard', defaultMessage: 'Difícil' },
  hardDescription: {
    id: 'selectGameType.hardDescription',
    defaultMessage: 'Palavras e pistas mais desafiadoras.',
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
