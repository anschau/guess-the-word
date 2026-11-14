import ReactTestRenderer, { act } from 'react-test-renderer'
import { IntlProvider } from 'react-intl'
import { Modal } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import PixelButton from '../src/components/PixelButton'
import ConfigScreen from '../src/screens/ConfigScreen/ConfigScreen'
import SelectGameTypeScreen from '../src/screens/SelectGameTypeScreen/SelectGameTypeScreen'
import type { MainStackParamList } from '../src/navigation/MainStack'
import { useSettingsRepository } from '../src/repositories/settingsRepository'
import { usePlayersRepository } from '../src/repositories/playersRepository'
import { useGameRepository } from '../src/repositories/gameRepository'
import { appStorage } from '../src/storage/appStorage'
import { hydrateRepositories } from '../src/storage/hydrateRepositories'

let renderer: ReactTestRenderer.ReactTestRenderer
const navigate = jest.fn()

beforeEach(async () => {
  jest.clearAllMocks()
  useSettingsRepository.setState(useSettingsRepository.getInitialState())
  await appStorage.clear()
})

afterEach(async () => {
  await act(() => renderer?.unmount())
})

async function renderConfig() {
  await act(() => {
    renderer = ReactTestRenderer.create(
      <IntlProvider locale="pt-BR" defaultLocale="pt-BR">
        <ConfigScreen
          navigation={
            { navigate } as unknown as StackScreenProps<
              MainStackParamList,
              'Config'
            >['navigation']
          }
          route={{ key: 'config', name: 'Config' }}
        />
      </IntlProvider>,
    )
  })
}

async function press(label: string) {
  await act(() =>
    renderer.root
      .findAllByType(PixelButton)
      .find(button => button.props.accessibilityLabel === label)!
      .props.onPress(),
  )
}

test('defaults to three, saves the modal choice and restores it for new games', async () => {
  await hydrateRepositories()
  expect(useSettingsRepository.getState().rounds).toBe(3)
  await renderConfig()
  await press('Número de turnos')
  await press('Aumentar turnos')
  await press('Salvar')
  expect(renderer.root.findByType(Modal).props.visible).toBe(false)
  const stored = await appStorage.getItem('settings')
  expect(JSON.parse(stored!).state.rounds).toBe(4)
  await act(() => renderer.unmount())
  useSettingsRepository.setState(useSettingsRepository.getInitialState())
  await appStorage.setItem('settings', stored!)
  await hydrateRepositories()
  expect(useSettingsRepository.getState().rounds).toBe(4)
  usePlayersRepository.getState().setPlayers(['Ana', 'Bruno'])
  await act(() => {
    renderer = ReactTestRenderer.create(
      <IntlProvider locale="pt-BR" defaultLocale="pt-BR">
        <SelectGameTypeScreen
          navigation={
            { navigate } as unknown as StackScreenProps<
              MainStackParamList,
              'SelectGameType'
            >['navigation']
          }
          route={{ key: 'type', name: 'SelectGameType' }}
        />
      </IntlProvider>,
    )
  })
  const buttons = renderer.root.findAllByType(PixelButton)
  await act(() => buttons[buttons.length - 1].props.onPress())
  expect(useGameRepository.getState().currentGame?.totalRounds).toBe(4)
  expect(navigate).toHaveBeenCalledWith('SwitchTurn', {
    playerName: 'Ana',
    round: 1,
    totalRounds: 4,
  })
})

test('keeps at least one turn and discards unsaved changes when closing', async () => {
  await renderConfig()
  await press('Número de turnos')
  await press('Diminuir turnos')
  await press('Diminuir turnos')
  expect(
    renderer.root
      .findAllByType(PixelButton)
      .find(button => button.props.accessibilityLabel === 'Diminuir turnos')!
      .props.disabled,
  ).toBe(true)
  await act(() => renderer.root.findByType(Modal).props.onRequestClose())
  expect(useSettingsRepository.getState().rounds).toBe(3)
  await press('Número de turnos')
  await press('Salvar')
  expect(useSettingsRepository.getState().rounds).toBe(3)
})
