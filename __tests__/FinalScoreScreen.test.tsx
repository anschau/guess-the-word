import ReactTestRenderer, { act } from 'react-test-renderer'
import { IntlProvider } from 'react-intl'
import type { StackScreenProps } from '@react-navigation/stack'
import PixelButton from '../src/components/PixelButton'
import FinalScoreScreen from '../src/screens/FinalScoreScreen/FinalScoreScreen'
import {
  PlayerScore,
  Winner,
} from '../src/screens/FinalScoreScreen/FinalScoreScreen.styles'
import type { MainStackParamList } from '../src/navigation/MainStack'
import { useGameRepository } from '../src/repositories/gameRepository'

type Props = StackScreenProps<MainStackParamList, 'FinalScore'>
const reset = jest.fn()
let renderer: ReactTestRenderer.ReactTestRenderer

beforeEach(() => {
  reset.mockClear()
  useGameRepository.getState().saveGame({
    id: 'finished',
    startedAt: '2026-11-14',
    difficulty: 'hard',
    round: 3,
    totalRounds: 3,
    currentPlayerIndex: 1,
    usedWordIds: ['1'],
    players: [
      { id: '0', name: 'Lucas', score: 2 },
      { id: '1', name: 'Ana', score: 5 },
    ],
  })
  useGameRepository.getState().finishGame()
})

afterEach(async () => {
  await act(() => renderer?.unmount())
})

async function renderScreen() {
  await act(() => {
    renderer = ReactTestRenderer.create(
      <IntlProvider locale="pt-BR" defaultLocale="pt-BR">
        <FinalScoreScreen
          navigation={{ reset } as unknown as Props['navigation']}
          route={{
            key: 'final',
            name: 'FinalScore',
            params: { gameId: 'finished' },
          }}
        />
      </IntlProvider>,
    )
  })
}

test('ranks scores without changing the saved player order and restarts with zero scores', async () => {
  await renderScreen()
  expect(renderer.root.findByType(Winner).props.children).toBe('Ana\nvenceu!')
  expect(
    renderer.root.findAllByType(PlayerScore).map(row => row.props.children[0]),
  ).toEqual(['Ana', 'Lucas'])
  await act(() => renderer.root.findAllByType(PixelButton)[0].props.onPress())
  const state = useGameRepository.getState()
  expect(state.currentGame).toMatchObject({
    difficulty: 'hard',
    round: 1,
    totalRounds: 3,
    currentPlayerIndex: 0,
    usedWordIds: [],
    players: [
      { name: 'Lucas', score: 0 },
      { name: 'Ana', score: 0 },
    ],
  })
  expect(state.history[0].players.map(player => player.score)).toEqual([2, 5])
  expect(reset).toHaveBeenCalledWith({
    index: 1,
    routes: [
      { name: 'Main' },
      {
        name: 'SwitchTurn',
        params: { playerName: 'Lucas', round: 1, totalRounds: 3 },
      },
    ],
  })
})

test('handles a tie and returns to the menu', async () => {
  const game = useGameRepository.getState().history[0]
  useGameRepository.setState({
    history: [
      {
        ...game,
        players: game.players.map(player => ({ ...player, score: 0 })),
      },
    ],
  })
  await renderScreen()
  expect(renderer.root.findByType(Winner).props.children).toBe('Deu empate!')
  await act(() => renderer.root.findAllByType(PixelButton)[1].props.onPress())
  expect(reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Main' }] })
  expect(useGameRepository.getState().currentGame).toBeNull()
})
