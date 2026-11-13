export type GameTypeId = 'easy' | 'medium' | 'hard'

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
}
