import { IntlProvider } from 'react-intl'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MainScreen from './src/screens/MainScreen/MainScreen'

export default function App() {
  return (
    <SafeAreaProvider>
      <IntlProvider locale="pt-BR" defaultLocale="pt-BR">
        <MainScreen />
      </IntlProvider>
    </SafeAreaProvider>
  )
}
