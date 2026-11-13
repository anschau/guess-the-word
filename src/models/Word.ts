import type { GameTypeId } from './GameType'

export type Word = {
  id: number
  wordName: string
  gameTypeId: GameTypeId
  clue1Title: string
  clue1Text: string
  clue1Translation: string
  clue2Title: string
  clue2Text: string
  clue2Translation: string
  clue3Title: string
  clue3Text: string
  clue3Translation: string
}
