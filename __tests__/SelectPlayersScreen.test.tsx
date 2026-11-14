import ReactTestRenderer, { act } from 'react-test-renderer'
import { IntlProvider } from 'react-intl'
import type { StackScreenProps } from '@react-navigation/stack'
import PixelButton from '../src/components/PixelButton'
import PixelTextInput from '../src/components/PixelTextInput'
import SelectPlayersScreen from '../src/screens/SelectPlayersScreen/SelectPlayersScreen'
import type { MainStackParamList } from '../src/navigation/MainStack'
import { usePlayersRepository } from '../src/repositories/playersRepository'
import { appStorage } from '../src/storage/appStorage'

type Props = StackScreenProps<MainStackParamList, 'SelectPlayers'>
const navigate = jest.fn()
const goBack = jest.fn()
let renderer: ReactTestRenderer.ReactTestRenderer

beforeEach(async () => {
  jest.clearAllMocks()
  usePlayersRepository.getState().setPlayers(['Ana', 'Bruno'])
})

afterEach(async () => {
  await act(() => renderer?.unmount())
})

async function renderScreen(mode: 'config' | 'game') {
  await act(() => {
    renderer = ReactTestRenderer.create(
      <IntlProvider locale="pt-BR" defaultLocale="pt-BR">
        <SelectPlayersScreen
          navigation={{ navigate, goBack } as unknown as Props['navigation']}
          route={{ key: 'players', name: 'SelectPlayers', params: { mode } }}
        />
      </IntlProvider>,
    )
  })
}

test.each(['config', 'game'] as const)(
  'loads and saves default players in %s mode',
  async mode => {
    await renderScreen(mode)
    const inputs = renderer.root.findAllByType(PixelTextInput)
    expect(inputs.map(input => input.props.value)).toEqual(['Ana', 'Bruno'])
    await act(() => inputs[0].props.onChangeText('  Carla  '))
    const action = mode === 'config' ? 'Salvar' : 'Avançar'
    await act(() => {
      renderer.root
        .findAllByType(PixelButton)
        .find(button => button.props.accessibilityLabel === action)!
        .props.onPress()
    })
    expect(
      JSON.parse((await appStorage.getItem('players'))!).state.players,
    ).toEqual(['Carla', 'Bruno'])
    if (mode === 'config') {
      expect(goBack).toHaveBeenCalledTimes(1)
      expect(navigate).not.toHaveBeenCalled()
    } else {
      expect(navigate).toHaveBeenCalledWith('SelectGameType')
      expect(goBack).not.toHaveBeenCalled()
    }
  },
)

test('does not replace saved players or leave settings with fewer than two names', async () => {
  await renderScreen('config')
  await act(() =>
    renderer.root.findAllByType(PixelTextInput)[1].props.onChangeText(' '),
  )
  await act(() => {
    renderer.root
      .findAllByType(PixelButton)
      .find(button => button.props.accessibilityLabel === 'Salvar')!
      .props.onPress()
  })
  expect(usePlayersRepository.getState().players).toEqual(['Ana', 'Bruno'])
  expect(goBack).not.toHaveBeenCalled()
})
