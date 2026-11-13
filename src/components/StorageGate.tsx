import { useEffect, useState, type ReactNode } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import { hydrateRepositories } from '../storage/hydrateRepositories'
import { theme } from '../theme/theme'

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
    <View style={styles.container}>
      {status === 'loading' ? (
        <ActivityIndicator accessibilityLabel="Carregando dados do jogo" />
      ) : (
        <>
          <Text accessibilityRole="alert">
            Não foi possível carregar os dados salvos do jogo.
          </Text>
          <Button
            title="Tentar novamente"
            onPress={() => {
              setStatus('loading')
              setAttempt(value => value + 1)
            }}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    backgroundColor: theme.colors.background,
  },
})
