import ReactTestRenderer, { act } from 'react-test-renderer'
import { IntlProvider } from 'react-intl'
import { Alert } from 'react-native'
import Share from 'react-native-share'
import { captureRef } from 'react-native-view-shot'
import type { StackScreenProps } from '@react-navigation/stack'
import PixelButton from '../src/components/PixelButton'
import FinalScoreScreen from '../src/screens/FinalScoreScreen/FinalScoreScreen'
import {
  ResultCard,
  Trophy,
  Winner,
} from '../src/screens/FinalScoreScreen/FinalScoreScreen.styles'
import { PlayerScore } from '../src/components/GameScore.styles'
import type { MainStackParamList } from '../src/navigation/MainStack'
import { useGameRepository } from '../src/repositories/gameRepository'

type Props = StackScreenProps<MainStackParamList, 'FinalScore'>
const reset = jest.fn()
let renderer: ReactTestRenderer.ReactTestRenderer

beforeEach(() => {
  reset.mockClear()
  jest.mocked(captureRef).mockReset().mockResolvedValue('/tmp/result.png')
  jest
    .mocked(Share.open)
    .mockReset()
    .mockResolvedValue({ success: true, message: '' })
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
    renderer.root.findAllByType(PlayerScore).map(row => row.props.children),
  ).toEqual(['Ana — 5 pontos', 'Lucas — 2 pontos'])
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
        name: 'SelectGameType',
        params: { playerName: 'Lucas' },
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
  await act(() => renderer.root.findAllByType(PixelButton)[2].props.onPress())
  expect(reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Main' }] })
  expect(useGameRepository.getState().currentGame).toBeNull()
})

function shareButton() {
  return renderer.root
    .findAllByType(PixelButton)
    .find(button => button.props.testID === 'share-result')!
}

test('shares the result as a PNG without capturing the action buttons', async () => {
  await renderScreen()
  expect(shareButton().props.disabled).toBe(true)
  await act(() => renderer.root.findByType(Trophy).props.onLoad())
  expect(shareButton().props.disabled).toBe(false)
  expect(
    renderer.root.findByType(ResultCard).findAllByType(PixelButton),
  ).toHaveLength(0)
  await act(() => shareButton().props.onPress())
  expect(captureRef).toHaveBeenCalledWith(expect.anything(), {
    format: 'png',
    result: 'tmpfile',
  })
  expect(Share.open).toHaveBeenCalledWith({
    url: 'file:///tmp/result.png',
    type: 'image/png',
    title: 'Compartilhar Resultado',
    failOnCancel: false,
  })
  expect(shareButton().props.disabled).toBe(false)
})

test('reports capture failures and allows retrying', async () => {
  const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {})
  jest.mocked(captureRef).mockRejectedValueOnce(new Error('capture failed'))
  await renderScreen()
  await act(() => renderer.root.findByType(Trophy).props.onLoad())
  await act(() => shareButton().props.onPress())
  expect(alert).toHaveBeenCalled()
  expect(Share.open).not.toHaveBeenCalled()
  expect(shareButton().props.disabled).toBe(false)
  await act(() => shareButton().props.onPress())
  expect(Share.open).toHaveBeenCalledTimes(1)
  alert.mockRestore()
})

test('does not offer sharing when the result is missing', async () => {
  useGameRepository.setState({ history: [] })
  await renderScreen()
  expect(shareButton()).toBeUndefined()
})
