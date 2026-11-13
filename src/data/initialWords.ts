import type { Word } from '../models/Word'

export const initialWords: Word[] = [
  {
    id: 1,
    wordName: 'apple',
    gameTypeId: 'easy',
    clue1Title: 'Categoria',
    clue1Text: 'É uma fruta.',
    clue2Title: 'Aparência',
    clue2Text: 'Pode ser vermelha ou verde.',
    clue3Title: 'Tradução',
    clue3Text: 'Em português, significa maçã.',
  },
  {
    id: 2,
    wordName: 'dog',
    gameTypeId: 'easy',
    clue1Title: 'Categoria',
    clue1Text: 'É um animal de estimação.',
    clue2Title: 'Som',
    clue2Text: 'Esse animal late.',
    clue3Title: 'Tradução',
    clue3Text: 'Em português, significa cachorro.',
  },
]
