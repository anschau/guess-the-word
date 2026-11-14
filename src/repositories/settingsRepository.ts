import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { appStorage } from '../storage/appStorage'

type SettingsRepository = {
  rounds: number
  setRounds: (rounds: number) => void
}

export const useSettingsRepository = create<SettingsRepository>()(
  persist(
    set => ({
      rounds: 3,
      setRounds: rounds => {
        if (Number.isSafeInteger(rounds) && rounds >= 1) set({ rounds })
      },
    }),
    {
      name: 'settings',
      version: 1,
      storage: createJSONStorage(() => appStorage),
      partialize: state => ({ rounds: state.rounds }),
      skipHydration: true,
    },
  ),
)
