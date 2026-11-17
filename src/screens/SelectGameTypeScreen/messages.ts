import { defineMessages } from 'react-intl'
import type { NoMessageValues } from 'react-intl'
import { gameTypes } from '../../models/GameType'

type MessageValues = {
  summary: { players: number; rounds: number; words: number }
} & Record<
  | 'title'
  | 'easy'
  | 'medium'
  | 'hard'
  | 'Movie80s'
  | 'namesOfBrazilianRock'
  | 'BestGames'
  | 'ForDevelopers'
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
  medium: { id: `${screenId}.medium`, defaultMessage: gameTypes.medium.title },
  hard: { id: `${screenId}.hard`, defaultMessage: gameTypes.hard.title },
  Movie80s: { id: `${screenId}.Movie80s`, defaultMessage: gameTypes.Movie80s.title },
  namesOfBrazilianRock: { id: `${screenId}.namesOfBrazilianRock`, defaultMessage: gameTypes.namesOfBrazilianRock.title },
  BestGames: { id: `${screenId}.BestGames`, defaultMessage: gameTypes.BestGames.title },
  ForDevelopers: { id: `${screenId}.ForDevelopers`, defaultMessage: gameTypes.ForDevelopers.title },
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
