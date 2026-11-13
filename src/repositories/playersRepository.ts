import { create } from 'zustand'

type PlayersRepository = {
  players: string[]
  setPlayers: (players: string[]) => void
}

export const usePlayersRepository = create<PlayersRepository>(set => ({
  players: [],
  setPlayers: players => set({ players }),
}))
