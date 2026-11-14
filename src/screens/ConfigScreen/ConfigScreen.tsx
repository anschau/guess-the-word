import { FontAwesome } from '@react-native-vector-icons/fontawesome/static'
import type { StackScreenProps } from '@react-navigation/stack'
import { useIntl } from 'react-intl'
import { StatusBar } from 'react-native'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import type { MainStackParamList } from '../../navigation/MainStack'
import { theme } from '../../theme/theme'
import {
  BackgroundContainer,
  BackgroundImage,
  ButtonLabel,
  PaperBottom,
  PaperTop,
  Rivet,
  SafeArea,
} from '../MainScreen/MainScreen.styles'
import {
  BackButton,
  BackLabel,
  ButtonContent,
  Content,
  Header,
  Panel,
  ScreenScroll,
  Title,
} from './ConfigScreen.styles'
import messages from './messages'

type ConfigScreenProps = StackScreenProps<MainStackParamList, 'Config'>

export default function ConfigScreen({ navigation }: ConfigScreenProps) {
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
            <Header>
              <Title $compact={compact} accessibilityRole="header">
                {intl.formatMessage(messages.title)}
              </Title>
            </Header>
            <Panel>
              <PaperTop />
              <PaperBottom />
              <Rivet $side="left" />
              <Rivet $side="right" />
              <PixelButton
                onPress={() =>
                  navigation.navigate('SelectPlayers', { mode: 'config' })
                }
              >
                <ButtonLabel $primary={false}>
                  {intl.formatMessage(messages.defaultPlayers)}
                </ButtonLabel>
              </PixelButton>
            </Panel>
          </Content>
        </ScreenScroll>
      </SafeArea>
    </>
  )
}
