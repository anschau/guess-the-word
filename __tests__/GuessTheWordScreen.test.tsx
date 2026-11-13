import ReactTestRenderer, { act } from 'react-test-renderer'
import { IntlProvider } from 'react-intl'
import { Text } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import PixelButton from '../src/components/PixelButton'
import GuessTheWordScreen from '../src/screens/GuessTheWordScreen/GuessTheWordScreen'
import type { MainStackParamList } from '../src/navigation/MainStack'
import { useGameRepository } from '../src/repositories/gameRepository'

type Props = StackScreenProps<MainStackParamList, 'GuessTheWord'>
const replace = jest.fn()
const popToTop = jest.fn()
let renderer: ReactTestRenderer.ReactTestRenderer

beforeEach(() => {
  jest.clearAllMocks()
  useGameRepository.getState().saveGame({
    id: 'test',
    startedAt: '2026-11-13',
    difficulty: 'easy',
    round: 1,
    totalRounds: 3,
    currentPlayerIndex: 0,
    usedWordIds: [],
    players: [
      { id: '0', name: 'Lucas', score: 0 },
      { id: '1', name: 'Ana', score: 0 },
    ],
  })
})

afterEach(async () => {
  await act(() => renderer?.unmount())
})

async function renderScreen() {
  await act(() => {
    renderer = ReactTestRenderer.create(
      <IntlProvider locale="pt-BR" defaultLocale="pt-BR">
        <GuessTheWordScreen
          navigation={{ replace, popToTop } as unknown as Props['navigation']}
          route={{
            key: 'guess',
            name: 'GuessTheWord',
            params: { playerName: 'Lucas', round: 1, totalRounds: 3 },
          }}
        />
      </IntlProvider>,
    )
  })
}

async function press(label: string) {
  const button = renderer.root
    .findAllByType(PixelButton)
    .find(node =>
      node.findAllByType(Text).some(text => text.props.children === label),
    )
  expect(button).toBeDefined()
  await act(() => button!.props.onPress())
}

test('awards two points after the second clue and hands off to the next player', async () => {
  await renderScreen()
  await press('Ninguém acertou ·\nPróxima dica')
  await press('Alguém acertou!')
  await press('Ana')
  const game = useGameRepository.getState().currentGame!
  expect(game.players.map(player => player.score)).toEqual([0, 2])
  expect(game.usedWordIds).toHaveLength(1)
  expect(game.currentPlayerIndex).toBe(1)
  expect(replace).toHaveBeenCalledWith('SwitchTurn', {
    playerName: 'Ana',
    round: 1,
    totalRounds: 3,
  })
})

test('ends the turn without points after the third missed clue', async () => {
  await renderScreen()
  await press('Ninguém acertou ·\nPróxima dica')
  await press('Ninguém acertou ·\nPróxima dica')
  await press('Ninguém acertou ·\nEncerrar vez')
  expect(
    useGameRepository
      .getState()
      .currentGame!.players.map(player => player.score),
  ).toEqual([0, 0])
  expect(replace).toHaveBeenCalledTimes(1)
})

test('finishes the last round and saves the final score', async () => {
  const game = useGameRepository.getState().currentGame!
  useGameRepository
    .getState()
    .saveGame({ ...game, round: 3, currentPlayerIndex: 1 })
  await renderScreen()
  await press('Alguém acertou!')
  await press('Lucas')
  expect(useGameRepository.getState().currentGame).toBeNull()
  expect(useGameRepository.getState().history[0].players[0].score).toBe(3)
  expect(replace).not.toHaveBeenCalled()
  await press('Voltar ao início')
  expect(popToTop).toHaveBeenCalledTimes(1)
})
