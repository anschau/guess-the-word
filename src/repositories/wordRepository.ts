import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { initialWords } from '../data/initialWords'
import type { GameTypeId } from '../models/GameType'
import type { Word } from '../models/Word'
import { appStorage } from '../storage/appStorage'

type WordRepository = {
  words: Word[]
  setWords: (words: Word[]) => void
  saveWord: (word: Word) => void
  getWordsByGameType: (gameTypeId: GameTypeId) => Word[]
}

export const useWordRepository = create<WordRepository>()(
  persist(
    (set, get) => ({
      words: initialWords.map(word => ({ ...word })),
      setWords: words => set({ words: words.map(word => ({ ...word })) }),
      saveWord: word =>
        set(state => ({
          words: state.words.some(item => item.id === word.id)
            ? state.words.map(item => (item.id === word.id ? { ...word } : item))
            : [...state.words, { ...word }],
        })),
      getWordsByGameType: gameTypeId =>
        get().words.filter(word => word.gameTypeId === gameTypeId),
    }),
    {
      name: 'words',
      version: 1,
      storage: createJSONStorage(() => appStorage),
      partialize: state => ({ words: state.words }),
      skipHydration: true,
    },
  ),
)
