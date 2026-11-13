import { IntlProvider } from 'react-intl'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MainStack from './src/navigation/MainStack'
import StorageGate from './src/components/StorageGate'

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <IntlProvider locale="pt-BR" defaultLocale="pt-BR">
          <StorageGate>
            <MainStack />
          </StorageGate>
        </IntlProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
