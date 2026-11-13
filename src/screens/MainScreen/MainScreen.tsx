import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { MainStackParamList } from '../../navigation/MainStack'
import { useIntl } from 'react-intl'
import { Modal, ScrollView, StatusBar } from 'react-native'
import { useCompact } from '../../config/config'
import messages from './messages'
import {
  BackgroundContainer,
  BackgroundImage,
  SafeArea,
  Content,
  Header,
  Logo,
  Menu,
  PaperTop,
  PaperBottom,
  AboutText,
  Footer,
  ModalBackdrop,
  DialogPanel,
  DialogTitle,
  DialogText,
  ScreenScroll,
  Tagline,
  FooterText,
  Rivet,
  ButtonOutline,
  AboutButton,
  ButtonFace,
  ButtonLabel,
} from './MainScreen.styles'

type Dialog = 'instructions' | 'about'

const dialogs = {
  instructions: {
    title: messages.instructions,
    text: messages.instructionsText,
  },
  about: {
    title: messages.aboutTitle,
    text: messages.aboutText,
  },
}

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
    <ButtonOutline accessibilityRole="button" onPress={onPress}>
      <ButtonFace $primary={primary}>
        <ButtonLabel $primary={primary}>{label}</ButtonLabel>
      </ButtonFace>
    </ButtonOutline>
  )
}

export default function MainScreen() {
  const navigation =
    useNavigation<StackNavigationProp<MainStackParamList, 'Main'>>()
  const intl = useIntl()
  const [dialog, setDialog] = useState<Dialog | null>(null)
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
              <Logo
                source={require('../../../assets/images/game-logo.png')}
                accessibilityLabel={intl.formatMessage(messages.logo)}
              />
              <Tagline $compact={compact}>
                {intl.formatMessage(messages.tagline)}
              </Tagline>
            </Header>
            <Menu>
              <PaperTop />
              <PaperBottom />
              <Rivet $side="left" />
              <Rivet $side="right" />
              <MenuButton
                label={intl.formatMessage(messages.play)}
                primary
                onPress={() => navigation.navigate('SelectPlayers')}
              />
              <MenuButton
                label={intl.formatMessage(messages.instructions)}
                onPress={() => setDialog('instructions')}
              />
              <AboutButton
                accessibilityRole="button"
                onPress={() => setDialog('about')}
              >
                <AboutText>{intl.formatMessage(messages.about)}</AboutText>
              </AboutButton>
            </Menu>
            <Footer>
              <PaperTop />
              <PaperBottom />
              <FooterText $compact={compact}>
                {intl.formatMessage(messages.footer)}
              </FooterText>
            </Footer>
          </Content>
        </ScreenScroll>
      </SafeArea>
      <Modal
        transparent
        visible={dialog !== null}
        animationType="fade"
        onRequestClose={() => setDialog(null)}
      >
        <ModalBackdrop>
          <DialogPanel accessibilityViewIsModal>
            <ScrollView>
              <DialogTitle accessibilityRole="header">
                {dialog && intl.formatMessage(dialogs[dialog].title)}
              </DialogTitle>
              <DialogText>
                {dialog && intl.formatMessage(dialogs[dialog].text)}
              </DialogText>
              <MenuButton
                label={intl.formatMessage(messages.back)}
                onPress={() => setDialog(null)}
              />
            </ScrollView>
          </DialogPanel>
        </ModalBackdrop>
      </Modal>
    </>
  )
}
