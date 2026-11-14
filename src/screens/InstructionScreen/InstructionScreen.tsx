import { FontAwesome } from '@react-native-vector-icons/fontawesome/static'
import type { StackScreenProps } from '@react-navigation/stack'
import { useIntl, type MessageDescriptor } from 'react-intl'
import type { ReactNode } from 'react'
import { StatusBar } from 'react-native'
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
  BackButton,
  BackLabel,
  Body,
  ButtonContent,
  ConfirmLabel,
  Content,
  Divider,
  Header,
  Panel,
  Score,
  ScreenScroll,
  Section,
  SectionTitle,
  StepTitle,
  Title,
} from './InstructionScreen.styles'
import messages from './messages'
import { theme } from '../../theme/theme'

type InstructionScreenProps = StackScreenProps<
  MainStackParamList,
  'Instruction'
>

const steps = [
  { title: messages.gatherTitle, text: messages.gatherText },
  { title: messages.passTitle, text: messages.passText },
  { title: messages.cluesTitle, text: messages.cluesText },
  { title: messages.guessesTitle, text: messages.guessesText },
  { title: messages.lastChanceTitle, text: messages.lastChanceText },
]

const scoreMessages: MessageDescriptor[] = [
  messages.firstClue,
  messages.secondClue,
  messages.thirdClue,
]

const formatScore = (chunks: ReactNode[]) => <Score>{chunks}</Score>

export default function InstructionScreen({
  navigation,
}: InstructionScreenProps) {
  const intl = useIntl()
  const compact = useCompact()

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
            <Header>
              <BackButton
                variant="neutral"
                accessibilityLabel={intl.formatMessage(messages.back)}
                onPress={() => navigation.goBack()}
              >
                <ButtonContent>
                  <FontAwesome
                    name="arrow-left"
                    size={20}
                    color={theme.colors.text}
                    accessible={false}
                  />
                  <BackLabel>{intl.formatMessage(messages.back)}</BackLabel>
                </ButtonContent>
              </BackButton>
              <Title $compact={compact} accessibilityRole="header">
                {intl.formatMessage(messages.title)}
              </Title>
            </Header>
            <Panel>
              <PaperTop />
              <PaperBottom />
              <Rivet $side="left" />
              <Rivet $side="right" />
              {steps.map(step => (
                <Section key={step.title.id}>
                  <StepTitle $compact={compact} accessibilityRole="header">
                    {intl.formatMessage(step.title)}
                  </StepTitle>
                  <Body $compact={compact}>
                    {intl.formatMessage(step.text)}
                  </Body>
                </Section>
              ))}
              <Divider />
              <Section>
                <SectionTitle $compact={compact} accessibilityRole="header">
                  {intl.formatMessage(messages.scoringTitle)}
                </SectionTitle>
                {scoreMessages.map(message => (
                  <Body key={message.id} $compact={compact}>
                    {intl.formatMessage(message, {
                      highlight: formatScore,
                    })}
                  </Body>
                ))}
                <Body $compact={compact}>
                  {intl.formatMessage(messages.readerScore)}
                </Body>
              </Section>
              <Divider />
              <Section>
                <SectionTitle $compact={compact} accessibilityRole="header">
                  {intl.formatMessage(messages.endingTitle)}
                </SectionTitle>
                <Body $compact={compact}>
                  {intl.formatMessage(messages.endingText)}
                </Body>
              </Section>
              <PixelButton
                variant="primary"
                onPress={() => navigation.goBack()}
              >
                <ConfirmLabel $compact={compact}>
                  {intl.formatMessage(messages.understood)}
                </ConfirmLabel>
              </PixelButton>
            </Panel>
          </Content>
        </ScreenScroll>
      </SafeArea>
    </>
  )
}
