import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { appStorage } from '../storage/appStorage'

export type GameDifficulty = 'easy' | 'medium' | 'hard'

type PreferencesRepository = {
  difficulty: GameDifficulty
  setDifficulty: (difficulty: GameDifficulty) => void
}

export const usePreferencesRepository = create<PreferencesRepository>()(
  persist(
    set => ({
      difficulty: 'easy',
      setDifficulty: difficulty => set({ difficulty }),
    }),
    {
      name: 'preferences',
      version: 1,
      storage: createJSONStorage(() => appStorage),
      partialize: state => ({ difficulty: state.difficulty }),
      skipHydration: true,
    },
  ),
)
