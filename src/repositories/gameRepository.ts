import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { appStorage } from '../storage/appStorage'
import { gameTypes, type GameTypeId } from '../models/GameType'

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

const initialBestScores = Object.fromEntries(
  Object.values(gameTypes).map(({ id }) => [id, 0]),
) as Record<GameTypeId, number>

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
      bestScores: { ...initialBestScores },
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
                state.bestScores[game.difficulty] ?? 0,
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
      merge: (persistedState, currentState) => {
        const saved = persistedState as Partial<GameRepository> | undefined
        return {
          ...currentState,
          ...saved,
          bestScores: { ...initialBestScores, ...saved?.bestScores },
        }
      },
      skipHydration: true,
    },
  ),
)
