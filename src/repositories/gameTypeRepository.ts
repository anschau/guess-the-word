import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { appStorage } from '../storage/appStorage'
import { gameTypes, type GameType } from '../models/GameType'

export type { GameType } from '../models/GameType'

type GameTypeRepository = {
  gameType: GameType
  setGameType: (gameType: GameType) => void
}

export const useGameTypeRepository = create<GameTypeRepository>()(
  persist(
    set => ({
      gameType: { ...gameTypes.easy },
      setGameType: gameType => set({ gameType: { ...gameType } }),
    }),
    {
      // Keep the original key so existing selections can be migrated.
      name: 'preferences',
      version: 3,
      storage: createJSONStorage(() => appStorage),
      partialize: state => ({ gameType: state.gameType }),
      migrate: (persistedState, version) => {
        const legacy = persistedState as {
          difficulty?: unknown
          gameType?: unknown
        } | null
        const id = version === 1 ? legacy?.difficulty : legacy?.gameType
        return {
          gameType: { ...gameTypes[id === 'medium' || id === 'hard' ? id : 'easy'] },
        }
      },
      skipHydration: true,
    },
  ),
)
