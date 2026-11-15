import { ButtonContent, Logo } from '../../components/Common.styles'
import BackButton from '../../components/BackButton'
import ScreenLayout from '../../components/ScreenLayout'
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static'
import type { StackScreenProps } from '@react-navigation/stack'
import { useIntl } from 'react-intl'
import { Alert, Linking } from 'react-native'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import type { MainStackParamList } from '../../navigation/MainStack'
import {
  Content,
  Divider,
  ScreenScroll,
} from '../../components/InfoScreen.styles'
import { Author, Body, GitHubLabel, Panel, Title } from './AboutScreen.styles'
import messages from './messages'

type AboutScreenProps = StackScreenProps<MainStackParamList, 'About'>

export default function AboutScreen({ navigation }: AboutScreenProps) {
  const intl = useIntl()
  const compact = useCompact()

  const openGitHub = async () => {
    try {
      await Linking.openURL('https://github.com/anschau/guess-the-word')
    } catch {
      Alert.alert(
        intl.formatMessage(messages.linkErrorTitle),
        intl.formatMessage(messages.linkErrorText),
      )
    }
  }

  return (
    <ScreenLayout>
      <ScreenScroll>
        <Content>
          <BackButton
            label={intl.formatMessage(messages.back)}
            onPress={() => navigation.goBack()}
          />
          <Logo
            source={require('../../../assets/images/game-logo.png')}
            accessibilityLabel={intl.formatMessage(messages.logo)}
          />
          <Panel>
            <Title $compact={compact} accessibilityRole="header">
              {intl.formatMessage(messages.title)}
            </Title>
            <Body $compact={compact}>
              {intl.formatMessage(messages.description)}
            </Body>
            <Divider />
            <Author $compact={compact}>
              {intl.formatMessage(messages.author)}
            </Author>
            <Body $compact={compact}>
              {intl.formatMessage(messages.project)}
            </Body>
            <PixelButton
              variant="primary"
              accessibilityLabel={intl.formatMessage(messages.github)}
              onPress={openGitHub}
            >
              <ButtonContent>
                <GitHubLabel $compact={compact}>
                  {intl.formatMessage(messages.github)}
                </GitHubLabel>
                <FontAwesome
                  name="external-link"
                  size={20}
                  color="#412704"
                  accessible={false}
                />
              </ButtonContent>
            </PixelButton>
          </Panel>
        </Content>
      </ScreenScroll>
    </ScreenLayout>
  )
}
