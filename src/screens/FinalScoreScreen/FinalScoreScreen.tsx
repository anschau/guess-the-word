import ScreenLayout from '../../components/ScreenLayout'
import { useRef, useState, type ComponentRef } from 'react'
import type { StackScreenProps } from '@react-navigation/stack'
import { useIntl } from 'react-intl'
import { Alert, type View } from 'react-native'
import Share from 'react-native-share'
import { captureRef } from 'react-native-view-shot'
import GameScore from '../../components/GameScore'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import type { MainStackParamList } from '../../navigation/MainStack'
import { useGameRepository } from '../../repositories/gameRepository'
import {
  Actions,
  Body,
  ButtonLabel,
  Celebration,
  Content,
  Divider,
  Panel,
  ScreenScroll,
  Title,
  Trophy,
  Winner,
  ResultCard,
  Brand,
} from './FinalScoreScreen.styles'
import messages from './messages'

type Props = StackScreenProps<MainStackParamList, 'FinalScore'>

export default function FinalScoreScreen({ route, navigation }: Props) {
  const intl = useIntl()
  const compact = useCompact()
  const restarting = useRef(false)
  const resultRef = useRef<ComponentRef<typeof View>>(null)
  const sharingRef = useRef(false)
  const [sharing, setSharing] = useState(false)
  const [imageReady, setImageReady] = useState(false)
  const game = useGameRepository(state =>
    state.history.find(item => item.id === route.params.gameId),
  )
  const players = [...(game?.players ?? [])].sort((a, b) => b.score - a.score)
  const tied = players.length > 1 && players[0].score === players[1].score

  async function shareResult() {
    if (!players.length || !imageReady || sharingRef.current) return
    sharingRef.current = true
    setSharing(true)
    try {
      const uri = await captureRef(resultRef, {
        format: 'png',
        result: 'tmpfile',
      })
      // Keep the temporary file available while the receiving app reads it.
      // View-shot removes its temporary captures when the app session ends.
      await Share.open({
        url: uri.startsWith('file://') ? uri : `file://${uri}`,
        type: 'image/png',
        title: intl.formatMessage(messages.share),
        failOnCancel: false,
      })
    } catch {
      Alert.alert(
        intl.formatMessage(messages.shareErrorTitle),
        intl.formatMessage(messages.shareError),
      )
    } finally {
      sharingRef.current = false
      setSharing(false)
    }
  }

  function playAgain() {
    if (!game || !game.players.length || restarting.current) return
    restarting.current = true
    const startedAt = new Date().toISOString()
    useGameRepository.getState().saveGame({
      id: startedAt,
      startedAt,
      difficulty: game.difficulty,
      totalRounds: game.totalRounds,
      round: 1,
      currentPlayerIndex: 0,
      players: game.players.map(player => ({ ...player, score: 0 })),
      usedWordIds: [],
    })
    navigation.reset({
      index: 1,
      routes: [
        { name: 'Main' },
        {
          name: 'SelectGameType',
          params: {
            playerName: game.players[0].name,
          },
        },
      ],
    })
  }

  return (
    <ScreenLayout>
      <ScreenScroll>
        <Content>
          <Title $compact={compact} accessibilityRole="header">
            {intl.formatMessage(messages.title)}
          </Title>
          <Panel>
            {players.length ? (
              <ResultCard ref={resultRef} collapsable={false}>
                <Brand>{intl.formatMessage(messages.brand)}</Brand>
                <Celebration>
                  <Trophy
                    source={require('../../../assets/images/trophy.png')}
                    $compact={compact}
                    resizeMode="contain"
                    accessible={false}
                    onLoad={() => setImageReady(true)}
                  />
                  <Winner $compact={compact}>
                    {tied
                      ? intl.formatMessage(messages.tie)
                      : intl.formatMessage(messages.winner, {
                          playerName: players[0].name,
                        })}
                  </Winner>
                  {!tied && (
                    <Body $compact={compact}>
                      {intl.formatMessage(messages.champion)}
                      {'\n'}
                      {intl.formatMessage(messages.translation)}
                    </Body>
                  )}
                </Celebration>
                <Divider />
                <GameScore
                  players={players}
                  title={intl.formatMessage(messages.ranking)}
                />
              </ResultCard>
            ) : (
              <Body $compact={compact}>
                {intl.formatMessage(messages.empty)}
              </Body>
            )}
            <Actions>
              {!!players.length && (
                <PixelButton variant="primary" onPress={playAgain}>
                  <ButtonLabel $compact={compact} $primary>
                    {intl.formatMessage(messages.playAgain)}
                  </ButtonLabel>
                </PixelButton>
              )}
              {!!players.length && (
                <PixelButton
                  testID="share-result"
                  onPress={shareResult}
                  disabled={sharing || !imageReady}
                  accessibilityState={{ busy: sharing }}
                >
                  <ButtonLabel $compact={compact}>
                    {intl.formatMessage(
                      sharing ? messages.sharing : messages.share,
                    )}
                  </ButtonLabel>
                </PixelButton>
              )}
              <PixelButton
                onPress={() =>
                  navigation.reset({ index: 0, routes: [{ name: 'Main' }] })
                }
              >
                <ButtonLabel $compact={compact}>
                  {intl.formatMessage(messages.menu)}
                </ButtonLabel>
              </PixelButton>
            </Actions>
          </Panel>
        </Content>
      </ScreenScroll>
    </ScreenLayout>
  )
}
