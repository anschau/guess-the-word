export type GameTypeId = 'easy' | 'medium' | 'hard' | 'Movie80s' | 'namesOfBrazilianRock' | 'BestGames' | 'ForDevelopers'

export type GameType = {
  id: GameTypeId
  title: string
  description: string
}

export const gameTypes: Record<GameTypeId, GameType> = {
  easy: {
    id: 'easy',
    title: 'Fácil',
    description: 'Palavras comuns e frases simples.',
  },
  medium: {
    id: 'medium',
    title: 'Médio',
    description: 'Vocabulário mais variado.',
  },
  hard: {
    id: 'hard',
    title: 'Difícil',
    description: 'Palavras e pistas mais desafiadoras.',
  },
  Movie80s: {
    id: 'Movie80s',
    title: 'Filmes Anos 80',
    description: 'Os melhores...',
  },
  namesOfBrazilianRock: {
    id: 'namesOfBrazilianRock',
    title: 'Nomes do Rock Brasileiro',
    description: 'Os melhores...',
  },
  BestGames: {
    id: 'BestGames',
    title: 'Jogos',
    description: 'Os melhores...',
  },
  ForDevelopers: {
    id: 'ForDevelopers',
    title: 'Para desenvolvedores',
    description: 'if...else',
  },
}
