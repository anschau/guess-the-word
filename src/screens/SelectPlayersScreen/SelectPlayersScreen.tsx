import {
  Content,
  Header,
  Panel,
  ScreenScroll,
  Title,
} from '../../components/FormScreen.styles'
import { ButtonLabel, ButtonContent } from '../../components/Common.styles'
import BackButton from '../../components/BackButton'
import ScreenLayout from '../../components/ScreenLayout'
import { useState } from 'react'
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainStackParamList } from '../../navigation/MainStack'
import { useIntl } from 'react-intl'
import { Platform } from 'react-native'
import { useCompact } from '../../config/config'
import PixelButton from '../../components/PixelButton'
import PixelTextInput from '../../components/PixelTextInput'
import { usePlayersRepository } from '../../repositories/playersRepository'
import {
  AddLabel,
  ErrorText,
  Field,
  KeyboardContainer,
  Label,
  Subtitle,
} from './SelectPlayersScreen.styles'
import messages from './messages'

type SelectPlayersScreenProps = StackScreenProps<
  MainStackParamList,
  'SelectPlayers'
>

export default function SelectPlayersScreen({
  navigation,
  route,
}: SelectPlayersScreenProps) {
  const intl = useIntl()
  const compact = useCompact()
  const isConfig = route.params?.mode === 'config'
  const actionMessage = isConfig ? messages.save : messages.next
  const savePlayers = usePlayersRepository(state => state.setPlayers)
  const savedPlayers = usePlayersRepository(state => state.players)
  const [players, setPlayers] = useState(() =>
    savedPlayers.length > 0 ? [...savedPlayers] : ['', '', ''],
  )
  const [submitted, setSubmitted] = useState(false)
  const filledPlayers = players
    .map(name => name.trim())
    .filter(name => name !== '')
  const hasEnoughPlayers = filledPlayers.length >= 2

  function handleContinue() {
    setSubmitted(true)
    if (!hasEnoughPlayers) return

    savePlayers(filledPlayers)
    if (isConfig) {
      navigation.goBack()
    } else {
      navigation.navigate('SelectGameType')
    }
  }

  return (
    <ScreenLayout>
      <KeyboardContainer
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScreenScroll>
          <Content>
            <BackButton
              label={intl.formatMessage(messages.back)}
              onPress={() => navigation.goBack()}
            />
            <Header>
              <Title $compact={compact} accessibilityRole="header">
                {intl.formatMessage(
                  isConfig ? messages.defaultPlayers : messages.title,
                )}
              </Title>
              <Subtitle $compact={compact}>
                {intl.formatMessage(messages.subtitle)}
              </Subtitle>
            </Header>
            <Panel>
              {players.map((name, index) => {
                const label = intl.formatMessage(messages.participant, {
                  number: index + 1,
                })
                return (
                  <Field key={index}>
                    <Label>{label}</Label>
                    <PixelTextInput
                      accessibilityLabel={label}
                      invalid={submitted && !hasEnoughPlayers && !name.trim()}
                      value={name}
                      autoCapitalize="words"
                      autoCorrect={false}
                      maxLength={40}
                      onChangeText={value =>
                        setPlayers(current =>
                          current.map((player, position) =>
                            position === index ? value : player,
                          ),
                        )
                      }
                    />
                  </Field>
                )
              })}
              {submitted && !hasEnoughPlayers && (
                <ErrorText accessibilityLiveRegion="polite">
                  {intl.formatMessage(messages.required)}
                </ErrorText>
              )}
              <PixelButton
                accessibilityLabel={intl.formatMessage(messages.add)}
                onPress={() => setPlayers(current => [...current, ''])}
              >
                <ButtonContent>
                  <FontAwesome
                    name="plus"
                    size={compact ? 16 : 20}
                    color="#213b45"
                    accessible={false}
                  />
                  <AddLabel $compact={compact}>
                    {intl.formatMessage(messages.add)}
                  </AddLabel>
                </ButtonContent>
              </PixelButton>
              <PixelButton
                variant="primary"
                accessibilityLabel={intl.formatMessage(actionMessage)}
                onPress={handleContinue}
              >
                <ButtonContent>
                  <ButtonLabel $primary>
                    {intl.formatMessage(actionMessage)}
                  </ButtonLabel>
                  <FontAwesome
                    name={isConfig ? 'check' : 'arrow-right'}
                    size={28}
                    color="#412704"
                    accessible={false}
                  />
                </ButtonContent>
              </PixelButton>
            </Panel>
          </Content>
        </ScreenScroll>
      </KeyboardContainer>
    </ScreenLayout>
  )
}
