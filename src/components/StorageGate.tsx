import { useEffect, useState, type ReactNode } from 'react'
import {
  Button,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { hydrateRepositories } from '../storage/hydrateRepositories'

export default function StorageGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    hydrateRepositories().then(
      () => active && setStatus('ready'),
      () => active && setStatus('error'),
    )
    return () => {
      active = false
    }
  }, [attempt])

  if (status === 'ready') return children

  return (
    <ImageBackground
      source={require('../../assets/images/wood-texture.png')}
      resizeMode="repeat"
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../../assets/images/game-logo.png')}
        resizeMode="contain"
        style={styles.logo}
        accessibilityLabel="Guess the Word — carregando dados do jogo"
      />
      {status === 'error' && (
        <View style={styles.error}>
          <Text accessibilityRole="alert" style={styles.errorText}>
            Não foi possível carregar os dados salvos do jogo.
          </Text>
          <Button
            title="Tentar novamente"
            onPress={() => {
              setStatus('loading')
              setAttempt(value => value + 1)
            }}
          />
        </View>
      )}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    backgroundColor: '#49230F',
  },
  logo: {
    width: '100%',
    maxWidth: 300,
    aspectRatio: 830 / 365,
  },
  error: {
    position: 'absolute',
    bottom: 48,
    left: 24,
    right: 24,
    gap: 16,
    padding: 16,
    backgroundColor: '#49230F',
  },
  errorText: {
    color: '#FFF1D2',
    textAlign: 'center',
  },
})
