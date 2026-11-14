import { useRef } from 'react'
import type { StackScreenProps } from '@react-navigation/stack'
import { useIntl } from 'react-intl'
import { StatusBar } from 'react-native'
import GameScore from '../../components/GameScore'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import type { MainStackParamList } from '../../navigation/MainStack'
import { useGameRepository } from '../../repositories/gameRepository'
import {
  BackgroundContainer,
  BackgroundImage,
  PaperBottom,
  PaperTop,
  Rivet,
  SafeArea,
} from '../MainScreen/MainScreen.styles'
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
} from './FinalScoreScreen.styles'
import messages from './messages'

type Props = StackScreenProps<MainStackParamList, 'FinalScore'>

export default function FinalScoreScreen({ route, navigation }: Props) {
  const intl = useIntl()
  const compact = useCompact()
  const restarting = useRef(false)
  const game = useGameRepository(state =>
    state.history.find(item => item.id === route.params.gameId),
  )
  const players = [...(game?.players ?? [])].sort((a, b) => b.score - a.score)
  const tied = players.length > 1 && players[0].score === players[1].score

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
    <>
      <BackgroundContainer>
        <BackgroundImage
          source={require('../../../assets/images/wood-texture.png')}
          resizeMode="repeat"
        />
      </BackgroundContainer>
      <StatusBar barStyle="light-content" />
      <SafeArea>
        <ScreenScroll>
          <Content>
            <Title $compact={compact} accessibilityRole="header">
              {intl.formatMessage(messages.title)}
            </Title>
            <Panel>
              <PaperTop />
              <PaperBottom />
              <Rivet $side="left" />
              <Rivet $side="right" />
              {players.length ? (
                <>
                  <Celebration>
                    <Trophy
                      source={require('../../../assets/images/trophy.png')}
                      $compact={compact}
                      resizeMode="contain"
                      accessible={false}
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
                  <Divider />
                </>
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
      </SafeArea>
    </>
  )
}
