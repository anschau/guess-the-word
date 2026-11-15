import {
  Content,
  Divider,
  Panel,
  ScreenScroll,
} from '../../components/InfoScreen.styles'
import BackButton from '../../components/BackButton'
import ScreenLayout from '../../components/ScreenLayout'
import type { StackScreenProps } from '@react-navigation/stack'
import { useIntl, type MessageDescriptor } from 'react-intl'
import type { ReactNode } from 'react'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import type { MainStackParamList } from '../../navigation/MainStack'
import {
  Body,
  ConfirmLabel,
  Header,
  Score,
  Section,
  SectionTitle,
  StepTitle,
  Title,
} from './InstructionScreen.styles'
import messages from './messages'

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
    <ScreenLayout>
      <ScreenScroll>
        <Content>
          <Header>
            <BackButton
              label={intl.formatMessage(messages.back)}
              onPress={() => navigation.goBack()}
            />
            <Title $compact={compact} accessibilityRole="header">
              {intl.formatMessage(messages.title)}
            </Title>
          </Header>
          <Panel>
            {steps.map(step => (
              <Section key={step.title.id}>
                <StepTitle $compact={compact} accessibilityRole="header">
                  {intl.formatMessage(step.title)}
                </StepTitle>
                <Body $compact={compact}>{intl.formatMessage(step.text)}</Body>
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
            <PixelButton variant="primary" onPress={() => navigation.goBack()}>
              <ConfirmLabel $compact={compact}>
                {intl.formatMessage(messages.understood)}
              </ConfirmLabel>
            </PixelButton>
          </Panel>
        </Content>
      </ScreenScroll>
    </ScreenLayout>
  )
}
