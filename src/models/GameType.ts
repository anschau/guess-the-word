export type GameTypeId = 'easy' | 'medium' | 'hard' | 'Movie80s' | 'namesOfBrazilianRock' | 'BestGames' | 'ForDevelopers'

export type GameType = {
  id: GameTypeId
  title: string
}

export const gameTypes: Record<GameTypeId, GameType> = {
  easy: {
    id: 'easy',
    title: 'Fácil',
  },
  medium: {
    id: 'medium',
    title: 'Médio',
  },
  hard: {
    id: 'hard',
    title: 'Difícil',
  },
  Movie80s: {
    id: 'Movie80s',
    title: 'Filmes Anos 80',
  },
  namesOfBrazilianRock: {
    id: 'namesOfBrazilianRock',
    title: 'Nomes do Rock Brasileiro',
  },
  BestGames: {
    id: 'BestGames',
    title: 'Jogos',
  },
  ForDevelopers: {
    id: 'ForDevelopers',
    title: 'Para devs',
  },
}
