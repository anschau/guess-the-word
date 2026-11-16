import { useEffect, useState } from 'react'
import ScreenLayout from '../../components/ScreenLayout'
import type { StackScreenProps } from '@react-navigation/stack'
import { useIntl } from 'react-intl'
import GameScoreHeader from '../../components/GameScoreHeader'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import type { MainStackParamList } from '../../navigation/MainStack'
import {
  ConfirmLabel,
  Content,
  Handoff,
  Instructions,
  Panel,
  PlayerName,
  RoundLabel,
  RoundValue,
  ScreenScroll,
  TurnTitle,
  Warning,
} from './SwitchTurnScreen.styles'
import messages from './messages'

type SwitchTurnScreenProps = StackScreenProps<MainStackParamList, 'SwitchTurn'>

export default function SwitchTurnScreen({
  route,
  navigation,
}: SwitchTurnScreenProps) {
  const intl = useIntl()
  const compact = useCompact()
  const { playerName, round, totalRounds } = route.params
  const [canConfirm, setCanConfirm] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setCanConfirm(true), 2000)
    return () => clearTimeout(timeout)
  }, [])

  function handleConfirm() {
    if (!canConfirm) return
    navigation.replace('GuessTheWord', route.params)
  }

  return (
    <ScreenLayout>
      <ScreenScroll>
        <Content>
          <GameScoreHeader
            onGameEnded={gameId => navigation.replace('FinalScore', { gameId })}
          >
            <RoundLabel $compact={compact}>
              {intl.formatMessage(messages.roundLabel)}{' '}
              <RoundValue $compact={compact}>
                {intl.formatMessage(messages.round, { round, totalRounds })}
              </RoundValue>
            </RoundLabel>
          </GameScoreHeader>
          <Panel>
            <TurnTitle $compact={compact} accessibilityRole="header">
              {intl.formatMessage(messages.turn, { playerName })}
            </TurnTitle>
            <Handoff>
              <Instructions $compact={compact}>
                {intl.formatMessage(messages.passPhone)}
              </Instructions>
              <PlayerName $compact={compact}>
                {intl.formatMessage(messages.player, { playerName })}
              </PlayerName>
            </Handoff>
            <Instructions $compact={compact}>
              {intl.formatMessage(messages.instructions)}
            </Instructions>
            <PixelButton
              variant="primary"
              accessibilityLabel={intl.formatMessage(messages.confirm, {
                playerName,
              })}
              disabled={!canConfirm}
              onPress={handleConfirm}
            >
              <ConfirmLabel $compact={compact}>
                {intl.formatMessage(messages.confirm, { playerName })}
              </ConfirmLabel>
            </PixelButton>
          </Panel>
          <Warning $compact={compact}>
            {intl.formatMessage(messages.warning)}
          </Warning>
        </Content>
      </ScreenScroll>
    </ScreenLayout>
  )
}
