import { useState } from 'react'
import { useIntl } from 'react-intl'
import { Modal, ScrollView, StatusBar } from 'react-native'
import type { PressableStateCallbackType } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { useCompact } from '../../config/config'
import { theme } from '../../theme/theme'
import messages from './messages'
import {
  getTextVariantStyles,
  TextVariant,
  TextVariantStyles,
} from '../../theme/typography'

const BackgroundContainer = styled.View({
  flex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
})

const BackgroundImage = styled.Image({
  flex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
})

const SafeArea = styled(SafeAreaView)({ flex: 1 })

const Content = styled.View({
  flexGrow: 1,
  width: '100%',
  maxWidth: 460,
  justifyContent: 'space-between',
  gap: 30,
})

const Header = styled.View({ alignItems: 'center', gap: 30 })

const Logo = styled.Image({
  resizeMode: 'contain',
  width: '100%',
  height: 'auto',
  aspectRatio: 830 / 365,
})

const Menu = styled.View({
  backgroundColor: theme.colors.background,
  borderWidth: 3,
  borderColor: theme.colors.border,
  paddingHorizontal: 24,
  paddingTop: 40,
  paddingBottom: 16,
  gap: 16,
  marginHorizontal: 5,
  boxShadow: `3px 6px 0px ${theme.colors.shadow}`,
})

const PaperTop = styled.View.attrs({ pointerEvents: 'none' })({
  position: 'absolute',
  height: 7,
  top: -7,
  left: 18,
  right: 18,
  backgroundColor: theme.colors.background,
  borderTopWidth: 3,
  borderColor: theme.colors.border,
})

const PaperBottom = styled.View.attrs({ pointerEvents: 'none' })({
  position: 'absolute',
  height: 7,
  bottom: -7,
  left: 22,
  right: 14,
  backgroundColor: theme.colors.background,
  borderBottomWidth: 3,
  borderColor: theme.colors.border,
})

const AboutText = styled.Text({
  ...TextVariantStyles[TextVariant.BUTTON],
  fontSize: TextVariantStyles[TextVariant.H2].fontSize,
})

const Footer = styled.View({
  backgroundColor: theme.colors.background,
  borderColor: theme.colors.border,
  borderWidth: 3,
  paddingHorizontal: 14,
  paddingVertical: 14,
  marginHorizontal: 8,
  marginBottom: 9,
  boxShadow: `2px 5px 0px ${theme.colors.shadow}`,
})

const ModalBackdrop = styled.View({
  flex: 1,
  backgroundColor: '#160d09cc',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 28,
})

const DialogPanel = styled.View({
  width: '100%',
  maxWidth: 420,
  maxHeight: '85%',
  backgroundColor: theme.colors.background,
  borderColor: '#20160c',
  borderWidth: 4,
  padding: 24,
})

const DialogTitle = styled.Text({
  ...TextVariantStyles[TextVariant.H3],
  textAlign: 'center',
  marginBottom: 16,
})

const DialogText = styled.Text({
  ...TextVariantStyles[TextVariant.BODY1],
  textAlign: 'center',
  marginBottom: 24,
})

const ScreenScroll = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1, alignItems: 'center', padding: 24 },
})({})

const Tagline = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TextVariant.H4, $compact),
  color: '#f9e7c6',
  textAlign: 'center',
  letterSpacing: 1,
  textShadow: '2px 3px 1px #2c170e',
}))

const FooterText = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TextVariant.H5, $compact),
  textAlign: 'center',
  letterSpacing: 0.5,
}))

const Rivet = styled.View.attrs({ pointerEvents: 'none' })<{
  $side: 'left' | 'right'
}>(({ $side }) => ({
  ...{
    position: 'absolute',
    top: 7,
    width: 20,
    height: 22,
    backgroundColor: '#737777',
    borderColor: '#171711',
    borderWidth: 3,
    borderRadius: 7,
    boxShadow: '1px 2px 0px #a89779',
    borderTopColor: '#a0a3a1',
  },
  ...($side === 'left' ? { left: 9 } : { right: 9 }),
}))

const pressedStyle = ({ pressed }: PressableStateCallbackType) =>
  pressed ? { transform: [{ translateY: 3 }], opacity: 0.85 } : undefined

const ButtonOutline = styled.Pressable.attrs({ style: pressedStyle })({
  borderWidth: 3,
  borderColor: '#171309',
  borderRadius: 6,
  boxShadow: '0px 5px 0px #b29e81',
  overflow: 'hidden',
})

const AboutButton = styled.Pressable.attrs({ style: pressedStyle })({
  minHeight: 48,
  alignItems: 'center',
  justifyContent: 'center',
})

const ButtonFace = styled.View<{ $primary: boolean }>(({ $primary }) => ({
  ...{
    borderTopWidth: 2,
    borderBottomWidth: 7,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ...($primary
    ? {
        backgroundColor: '#e3b550',
        borderTopColor: '#f2cf7c',
        borderBottomColor: '#b98c36',
        minHeight: 76,
      }
    : {
        backgroundColor: '#a7c6d0',
        borderTopColor: '#c0d9df',
        borderBottomColor: '#7c9da7',
        minHeight: 54,
      }),
}))

const ButtonLabel = styled.Text<{ $primary: boolean }>(({ $primary }) => ({
  ...TextVariantStyles[TextVariant.BUTTON],
  ...($primary
    ? {
        fontSize: TextVariantStyles[TextVariant.H1].fontSize,
        color: '#412704',
      }
    : { color: '#213b45' }),
}))

type MainScreenProps = { onPlay?: () => void }
type Dialog = 'play' | 'instructions' | 'about'

const dialogs = {
  play: {
    title: messages.playTitle,
    text: messages.playText,
  },
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

export default function MainScreen({ onPlay }: MainScreenProps) {
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
                onPress={() => (onPlay ? onPlay() : setDialog('play'))}
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
