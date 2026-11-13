import { appStorage } from '../src/storage/appStorage'
import { gameTypes } from '../src/models/GameType'
import { hydrateRepositories } from '../src/storage/hydrateRepositories'
import { usePlayersRepository } from '../src/repositories/playersRepository'
import { useGameTypeRepository } from '../src/repositories/gameTypeRepository'
import {
  GAME_HISTORY_LIMIT,
  type SavedGame,
  useGameRepository,
} from '../src/repositories/gameRepository'

function resetMemory() {
  usePlayersRepository.setState(usePlayersRepository.getInitialState())
  useGameTypeRepository.setState(useGameTypeRepository.getInitialState())
  useGameRepository.setState(useGameRepository.getInitialState())
}

function game(id = 'game-1', score = 10): SavedGame {
  return {
    id,
    startedAt: '2026-11-13T12:00:00.000Z',
    difficulty: 'medium',
    totalRounds: 3,
    round: 2,
    currentPlayerIndex: 1,
    players: [
      { id: 'player-1', name: 'Ana', score },
      { id: 'player-2', name: 'Bruno', score: 5 },
    ],
    usedWordIds: ['word-1', 'word-2'],
  }
}

beforeEach(async () => {
  jest.restoreAllMocks()
  resetMemory()
  await appStorage.clear()
})

test('restores players, game type and progress from storage after memory is reset', async () => {
  await hydrateRepositories()
  usePlayersRepository.getState().setPlayers(['Ana', 'Bruno'])
  useGameTypeRepository.getState().setGameType(gameTypes.medium)
  useGameRepository.getState().saveGame(game())

  const savedData = await appStorage.getMany(['players', 'preferences', 'game'])
  expect(JSON.parse(savedData.players!)).toEqual({
    version: 1,
    state: { players: ['Ana', 'Bruno'] },
  })
  resetMemory()
  for (const [key, value] of Object.entries(savedData)) {
    await appStorage.setItem(key, value!)
  }
  await hydrateRepositories()

  expect(usePlayersRepository.getState().players).toEqual(['Ana', 'Bruno'])
  expect(useGameTypeRepository.getState().gameType).toEqual(gameTypes.medium)
  expect(useGameRepository.getState().currentGame).toEqual(game())
  expect(usePlayersRepository.getState().setPlayers).toEqual(expect.any(Function))
})

test.each([
  { version: 1, state: { difficulty: 'hard' } },
  { version: 2, state: { gameType: 'hard' } },
])('migrates version $version to a GameType object', async legacy => {
  await appStorage.setItem(
    'preferences',
    JSON.stringify(legacy),
  )

  await hydrateRepositories()

  expect(useGameTypeRepository.getState().gameType).toEqual(gameTypes.hard)
  expect(JSON.parse((await appStorage.getItem('preferences'))!)).toEqual({
    version: 3,
    state: { gameType: gameTypes.hard },
  })
})

test('keeps the last 20 results and retains the record after its game leaves history', async () => {
  const { saveGame, finishGame } = useGameRepository.getState()
  saveGame(game('record', 100))
  finishGame()
  for (let index = 0; index < GAME_HISTORY_LIMIT; index += 1) {
    saveGame(game(`game-${index}`, index))
    finishGame()
  }
  finishGame()

  const savedData = await appStorage.getItem('game')
  resetMemory()
  await appStorage.setItem('game', savedData!)
  await hydrateRepositories()

  const state = useGameRepository.getState()
  expect(state.currentGame).toBeNull()
  expect(state.history).toHaveLength(GAME_HISTORY_LIMIT)
  expect(state.history[0].id).toBe('game-19')
  expect(state.history.some(item => item.id === 'record')).toBe(false)
  expect(state.history[0].finishedAt).toEqual(expect.any(String))
  expect(state.bestScores).toEqual({ easy: 0, medium: 100, hard: 0 })
})

test('discarding a game does not add a result or record', async () => {
  useGameRepository.getState().saveGame(game())
  useGameRepository.getState().discardGame()
  await hydrateRepositories()
  expect(useGameRepository.getState()).toMatchObject({
    currentGame: null,
    history: [],
    bestScores: { easy: 0, medium: 0, hard: 0 },
  })
})

test('allows retrying a failed read without overwriting saved players', async () => {
  const savedPlayers = JSON.stringify({
    version: 1,
    state: { players: ['Ana', 'Bruno'] },
  })
  await appStorage.setItem('players', savedPlayers)
  jest.spyOn(appStorage, 'getItem').mockRejectedValueOnce(new Error('Read failed'))

  await expect(hydrateRepositories()).rejects.toThrow()
  expect(await appStorage.getItem('players')).toBe(savedPlayers)
  await hydrateRepositories()
  expect(usePlayersRepository.getState().players).toEqual(['Ana', 'Bruno'])
})
