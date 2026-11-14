import ReactTestRenderer, { act } from 'react-test-renderer'
import { IntlProvider } from 'react-intl'
import { Modal } from 'react-native'
import GuessTheWordScreen from '../src/screens/GuessTheWordScreen/GuessTheWordScreen'
import SwitchTurnScreen from '../src/screens/SwitchTurnScreen/SwitchTurnScreen'
import GameScoreHeader from '../src/components/GameScoreHeader'
import PixelButton from '../src/components/PixelButton'
import { PlayerScore, Position } from '../src/components/GameScore.styles'
import { useGameRepository } from '../src/repositories/gameRepository'

let renderer: ReactTestRenderer.ReactTestRenderer

afterEach(async () => {
  await act(() => renderer?.unmount())
})

test.each([GuessTheWordScreen, SwitchTurnScreen])(
  '%p opens the current score, updates it and closes without changing the game',
  async Screen => {
    useGameRepository.getState().saveGame({
      id: 'score',
      startedAt: '2026-11-14',
      difficulty: 'easy',
      round: 1,
      totalRounds: 3,
      currentPlayerIndex: 0,
      usedWordIds: [],
      players: [
        { id: 'a', name: 'Ana', score: 1 },
        { id: 'b', name: 'Lucas', score: 3 },
        { id: 'c', name: 'Bia', score: 3 },
      ],
    })
    const replace = jest.fn()
    const params = { playerName: 'Ana', round: 1, totalRounds: 3 }
    await act(() => {
      renderer = ReactTestRenderer.create(
        <IntlProvider locale="pt-BR" defaultLocale="pt-BR">
          <Screen
            navigation={{ replace } as never}
            route={{ key: 'score', name: 'GuessTheWord', params } as never}
          />
        </IntlProvider>,
      )
    })
    const header = renderer.root.findByType(GameScoreHeader)
    expect(header.findByType(Modal).props.visible).toBe(false)
    await act(() =>
      header
        .findAllByType(PixelButton)
        .find(button => button.props.accessibilityLabel === 'Ver placar')!
        .props.onPress(),
    )
    expect(header.findByType(Modal).props.visible).toBe(true)
    expect(
      header.findAllByType(PlayerScore).map(row => row.props.children),
    ).toEqual(['Lucas — 3 pontos', 'Bia — 3 pontos', 'Ana — 1 ponto'])
    expect(
      header.findAllByType(Position).map(row => row.props.children[0]),
    ).toEqual([1, 1, 3])
    const game = useGameRepository.getState().currentGame!
    expect(game.players.map(player => player.name)).toEqual([
      'Ana',
      'Lucas',
      'Bia',
    ])
    await act(() =>
      useGameRepository.getState().saveGame({
        ...game,
        players: game.players.map(player => ({
          ...player,
          score: player.id === 'a' ? 5 : player.score,
        })),
      }),
    )
    expect(header.findAllByType(PlayerScore)[0].props.children).toBe(
      'Ana — 5 pontos',
    )
    await act(() =>
      header
        .findAllByType(PixelButton)
        .find(button => button.props.accessibilityLabel === 'Fechar')!
        .props.onPress(),
    )
    expect(header.findByType(Modal).props.visible).toBe(false)
    expect(replace).not.toHaveBeenCalled()

    const openEndDialog = () =>
      header
        .findAllByType(PixelButton)
        .find(button => button.props.accessibilityLabel === 'Encerrar jogo')!
        .props.onPress()
    const currentGame = useGameRepository.getState().currentGame
    await act(openEndDialog)
    expect(header.findByType(Modal).props.visible).toBe(true)
    expect(useGameRepository.getState().currentGame).toBe(currentGame)
    await act(() =>
      header
        .findAllByType(PixelButton)
        .find(
          button => button.props.accessibilityLabel === 'Continuar jogando',
        )!
        .props.onPress(),
    )
    expect(header.findByType(Modal).props.visible).toBe(false)
    expect(useGameRepository.getState().currentGame).toBe(currentGame)
    expect(replace).not.toHaveBeenCalled()

    await act(openEndDialog)
    await act(() => header.findByType(Modal).props.onRequestClose())
    expect(useGameRepository.getState().currentGame).toBe(currentGame)
    await act(openEndDialog)
    const confirm = header
      .findAllByType(PixelButton)
      .find(
        button =>
          button.props.variant === 'danger' && !button.props.accessibilityLabel,
      )!
    await act(() => {
      confirm.props.onPress()
      confirm.props.onPress()
    })
    expect(useGameRepository.getState().currentGame).toBeNull()
    expect(useGameRepository.getState().history[0]).toMatchObject(currentGame!)
    expect(replace).toHaveBeenCalledTimes(1)
    expect(replace).toHaveBeenCalledWith('FinalScore', { gameId: 'score' })
  },
)
