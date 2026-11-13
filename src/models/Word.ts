import type { GameTypeId } from './GameType'

export type Word = {
  id: number
  wordName: string
  gameTypeId: GameTypeId
  clue1Title: string
  clue1Text: string
  clue2Title: string
  clue2Text: string
  clue3Title: string
  clue3Text: string
}
