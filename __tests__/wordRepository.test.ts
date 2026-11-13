import { initialWords } from '../src/data/initialWords'
import { useWordRepository } from '../src/repositories/wordRepository'
import { appStorage } from '../src/storage/appStorage'

beforeEach(async () => {
  useWordRepository.setState(useWordRepository.getInitialState())
  await appStorage.clear()
})

test('starts with two examples and filters by game type', async () => {
  await useWordRepository.persist.rehydrate()
  const repository = useWordRepository.getState()
  expect(repository.words).toEqual(initialWords)
  expect(repository.words).toHaveLength(2)
  repository.saveWord({ ...initialWords[0], id: 3, gameTypeId: 'medium' })
  expect(repository.getWordsByGameType('medium').map(word => word.id)).toEqual([3])
  expect(repository.getWordsByGameType('hard')).toEqual([])
})

test('persists additions and updates without duplicating IDs', async () => {
  const updated = { ...initialWords[0], clue1Text: 'Uma fruta usada em tortas.' }
  const added = { ...initialWords[1], id: 3, gameTypeId: 'medium' as const }
  useWordRepository.getState().saveWord(updated)
  useWordRepository.getState().saveWord(added)
  const saved = await appStorage.getItem('words')

  useWordRepository.setState(useWordRepository.getInitialState())
  await appStorage.setItem('words', saved!)
  await useWordRepository.persist.rehydrate()

  expect(useWordRepository.getState().words).toEqual([
    updated,
    initialWords[1],
    added,
  ])
})

test('restores an intentionally empty catalog without adding the examples again', async () => {
  useWordRepository.getState().setWords([])
  await useWordRepository.persist.rehydrate()
  expect(useWordRepository.getState().words).toEqual([])
})
