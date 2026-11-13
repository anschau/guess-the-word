import type { StackScreenProps } from '@react-navigation/stack'
import { useIntl } from 'react-intl'
import { Alert, StatusBar } from 'react-native'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import type { MainStackParamList } from '../../navigation/MainStack'
import {
  BackgroundContainer,
  BackgroundImage,
  PaperBottom,
  PaperTop,
  Rivet,
  SafeArea,
} from '../MainScreen/MainScreen.styles'
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

export default function SwitchTurnScreen({ route }: SwitchTurnScreenProps) {
  const intl = useIntl()
  const compact = useCompact()
  const { playerName, round, totalRounds } = route.params

  function handleConfirm() {
    Alert.alert(
      intl.formatMessage(messages.comingSoonTitle),
      intl.formatMessage(messages.comingSoonText),
    )
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
            <RoundLabel $compact={compact}>
              {intl.formatMessage(messages.roundLabel)}{' '}
              <RoundValue $compact={compact}>
                {intl.formatMessage(messages.round, { round, totalRounds })}
              </RoundValue>
            </RoundLabel>
            <Panel>
              <PaperTop />
              <PaperBottom />
              <Rivet $side="left" />
              <Rivet $side="right" />
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
                accessibilityLabel={intl.formatMessage(messages.confirm)}
                onPress={handleConfirm}
              >
                <ConfirmLabel $compact={compact}>
                  {intl.formatMessage(messages.confirm)}
                </ConfirmLabel>
              </PixelButton>
            </Panel>
            <Warning $compact={compact}>
              {intl.formatMessage(messages.warning)}
            </Warning>
          </Content>
        </ScreenScroll>
      </SafeArea>
    </>
  )
}
