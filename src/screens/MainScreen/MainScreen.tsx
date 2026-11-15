import { Logo, ButtonLabel } from '../../components/Common.styles'
import { PaperEdges } from '../../components/PaperPanel'
import ScreenLayout from '../../components/ScreenLayout'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { MainStackParamList } from '../../navigation/MainStack'
import { useIntl } from 'react-intl'
import { useCompact } from '../../config/config'
import PixelButton from '../../components/PixelButton'
import messages from './messages'
import {
  Content,
  Header,
  Menu,
  AboutText,
  Footer,
  ScreenScroll,
  Tagline,
  FooterText,
  AboutButton,
} from './MainScreen.styles'

function MenuButton({
  label,
  primary = false,
  onPress,
}: {
  label: string
  primary?: boolean
  onPress: () => void
}) {
  return (
    <PixelButton variant={primary ? 'primary' : 'secondary'} onPress={onPress}>
      <ButtonLabel $primary={primary}>{label}</ButtonLabel>
    </PixelButton>
  )
}

export default function MainScreen() {
  const navigation =
    useNavigation<StackNavigationProp<MainStackParamList, 'Main'>>()
  const intl = useIntl()
  const compact = useCompact()

  return (
    <ScreenLayout>
      <ScreenScroll>
        <Content>
          <Header>
            <Logo
              source={require('../../../assets/images/game-logo.png')}
              accessibilityLabel={intl.formatMessage(messages.logo)}
            />
            <Tagline $compact={compact}>
              {intl.formatMessage(messages.tagline)}
            </Tagline>
          </Header>
          <Menu>
            <MenuButton
              label={intl.formatMessage(messages.play)}
              primary
              onPress={() =>
                navigation.navigate('SelectPlayers', { mode: 'game' })
              }
            />
            <MenuButton
              label={intl.formatMessage(messages.config)}
              onPress={() => navigation.navigate('Config')}
            />
            <MenuButton
              label={intl.formatMessage(messages.instructions)}
              onPress={() => navigation.navigate('Instruction')}
            />
            <AboutButton
              accessibilityRole="button"
              onPress={() => navigation.navigate('About')}
            >
              <AboutText>{intl.formatMessage(messages.about)}</AboutText>
            </AboutButton>
          </Menu>
          <Footer>
            <PaperEdges />
            <FooterText $compact={compact}>
              {intl.formatMessage(messages.footer)}
            </FooterText>
          </Footer>
        </Content>
      </ScreenScroll>
    </ScreenLayout>
  )
}
