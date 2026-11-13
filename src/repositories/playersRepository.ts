import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { appStorage } from '../storage/appStorage'

type PlayersRepository = {
  players: string[]
  setPlayers: (players: string[]) => void
}

export const usePlayersRepository = create<PlayersRepository>()(
  persist(
    set => ({
      players: [],
      setPlayers: players => set({ players: [...players] }),
    }),
    {
      name: 'players',
      version: 1,
      storage: createJSONStorage(() => appStorage),
      partialize: state => ({ players: state.players }),
      skipHydration: true,
    },
  ),
)
