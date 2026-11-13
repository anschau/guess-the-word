import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { appStorage } from '../storage/appStorage'
import type { GameTypeId } from '../models/GameType'

export type SavedGame = {
  id: string
  startedAt: string
  difficulty: GameTypeId
  totalRounds: number
  round: number
  currentPlayerIndex: number
  players: { id: string; name: string; score: number }[]
  usedWordIds: string[]
}

export type CompletedGame = SavedGame & { finishedAt: string }

export const GAME_HISTORY_LIMIT = 20

type GameRepository = {
  currentGame: SavedGame | null
  history: CompletedGame[]
  bestScores: Record<GameTypeId, number>
  saveGame: (game: SavedGame) => void
  discardGame: () => void
  finishGame: () => void
}

export const useGameRepository = create<GameRepository>()(
  persist(
    set => ({
      currentGame: null,
      history: [],
      bestScores: { easy: 0, medium: 0, hard: 0 },
      saveGame: game =>
        set({
          currentGame: {
            ...game,
            players: game.players.map(player => ({ ...player })),
            usedWordIds: [...game.usedWordIds],
          },
        }),
      discardGame: () => set({ currentGame: null }),
      finishGame: () =>
        set(state => {
          const game = state.currentGame
          if (!game) return state

          const completedGame = { ...game, finishedAt: new Date().toISOString() }
          return {
            currentGame: null,
            history: [
              completedGame,
              ...state.history.filter(item => item.id !== game.id),
            ].slice(0, GAME_HISTORY_LIMIT),
            bestScores: {
              ...state.bestScores,
              [game.difficulty]: Math.max(
                state.bestScores[game.difficulty],
                ...game.players.map(player => player.score),
              ),
            },
          }
        }),
    }),
    {
      name: 'game',
      version: 1,
      storage: createJSONStorage(() => appStorage),
      partialize: state => ({
        currentGame: state.currentGame,
        history: state.history,
        bestScores: state.bestScores,
      }),
      skipHydration: true,
    },
  ),
)
