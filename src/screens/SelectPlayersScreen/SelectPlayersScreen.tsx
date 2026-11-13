import { useState } from 'react'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainStackParamList } from '../../navigation/MainStack'
import { useIntl } from 'react-intl'
import { Alert, Platform, StatusBar } from 'react-native'
import { useCompact } from '../../config/config'
import {
  BackgroundContainer,
  BackgroundImage,
  ButtonFace,
  ButtonLabel,
  ButtonOutline,
  PaperBottom,
  PaperTop,
  Rivet,
  SafeArea,
} from '../MainScreen/MainScreen.styles'
import {
  AddLabel,
  BackButton,
  BackFace,
  BackLabel,
  Content,
  ErrorText,
  Field,
  Header,
  Input,
  KeyboardContainer,
  Label,
  Panel,
  ScreenScroll,
  Subtitle,
  Title,
} from './SelectPlayersScreen.styles'
import messages from './messages'

type SelectPlayersScreenProps = StackScreenProps<
  MainStackParamList,
  'SelectPlayers'
> & {
  onContinue?: (players: string[]) => void
}

export default function SelectPlayersScreen({
  navigation,
  onContinue,
}: SelectPlayersScreenProps) {
  const intl = useIntl()
  const compact = useCompact()
  const [players, setPlayers] = useState(['', '', ''])
  const [submitted, setSubmitted] = useState(false)
  const hasEmptyName = players.some(name => !name.trim())

  function handleContinue() {
    setSubmitted(true)
    if (hasEmptyName) return

    if (onContinue) {
      onContinue(players.map(name => name.trim()))
    } else {
      Alert.alert(
        intl.formatMessage(messages.comingSoonTitle),
        intl.formatMessage(messages.comingSoonText),
      )
    }
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
        <KeyboardContainer
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScreenScroll>
            <Content>
              <BackButton
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
              >
                <BackFace>
                  <BackLabel>{intl.formatMessage(messages.back)}</BackLabel>
                </BackFace>
              </BackButton>
              <Header>
                <Title $compact={compact} accessibilityRole="header">
                  {intl.formatMessage(messages.title)}
                </Title>
                <Subtitle $compact={compact}>
                  {intl.formatMessage(messages.subtitle)}
                </Subtitle>
              </Header>
              <Panel>
                <PaperTop />
                <PaperBottom />
                <Rivet $side="left" />
                <Rivet $side="right" />
                {players.map((name, index) => {
                  const label = intl.formatMessage(messages.participant, {
                    number: index + 1,
                  })
                  return (
                    <Field key={index}>
                      <Label>{label}</Label>
                      <Input
                        accessibilityLabel={label}
                        $invalid={submitted && !name.trim()}
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
                {submitted && hasEmptyName && (
                  <ErrorText accessibilityLiveRegion="polite">
                    {intl.formatMessage(messages.required)}
                  </ErrorText>
                )}
                <ButtonOutline
                  accessibilityRole="button"
                  onPress={() => setPlayers(current => [...current, ''])}
                >
                  <ButtonFace $primary={false}>
                    <AddLabel $compact={compact}>
                      {intl.formatMessage(messages.add)}
                    </AddLabel>
                  </ButtonFace>
                </ButtonOutline>
                <ButtonOutline
                  accessibilityRole="button"
                  onPress={handleContinue}
                >
                  <ButtonFace $primary>
                    <ButtonLabel $primary>
                      {intl.formatMessage(messages.next)}
                    </ButtonLabel>
                  </ButtonFace>
                </ButtonOutline>
              </Panel>
            </Content>
          </ScreenScroll>
        </KeyboardContainer>
      </SafeArea>
    </>
  )
}
