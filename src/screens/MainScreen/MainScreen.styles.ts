import type { PressableStateCallbackType } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { theme } from '../../theme/theme'
import {
  getTextVariantStyles,
  TypographyVariant,
  TypographyVariantStyles,
} from '../../theme/typography'

export const BackgroundContainer = styled.View({
  flex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
})

export const BackgroundImage = styled.Image({
  flex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
})

export const SafeArea = styled(SafeAreaView)({ flex: 1 })

export const Content = styled.View({
  flexGrow: 1,
  width: '100%',
  maxWidth: 460,
  justifyContent: 'space-between',
  gap: 30,
})

export const Header = styled.View({ alignItems: 'center', gap: 30 })

export const Logo = styled.Image({
  resizeMode: 'contain',
  width: '100%',
  height: 'auto',
  aspectRatio: 830 / 365,
})

export const Menu = styled.View({
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

export const PaperTop = styled.View.attrs({ pointerEvents: 'none' })({
  position: 'absolute',
  height: 7,
  top: -7,
  left: 18,
  right: 18,
  backgroundColor: theme.colors.background,
  borderTopWidth: 3,
  borderColor: theme.colors.border,
})

export const PaperBottom = styled.View.attrs({ pointerEvents: 'none' })({
  position: 'absolute',
  height: 7,
  bottom: -7,
  left: 22,
  right: 14,
  backgroundColor: theme.colors.background,
  borderBottomWidth: 3,
  borderColor: theme.colors.border,
})

export const AboutText = styled.Text({
  ...TypographyVariantStyles[TypographyVariant.BUTTON],
  fontSize: TypographyVariantStyles[TypographyVariant.H2].fontSize,
})

export const Footer = styled.View({
  backgroundColor: theme.colors.background,
  borderColor: theme.colors.border,
  borderWidth: 3,
  paddingHorizontal: 14,
  paddingVertical: 14,
  marginHorizontal: 8,
  marginBottom: 9,
  boxShadow: `2px 5px 0px ${theme.colors.shadow}`,
})

export const ModalBackdrop = styled.View({
  flex: 1,
  backgroundColor: '#160d09cc',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 28,
})

export const DialogPanel = styled.View({
  width: '100%',
  maxWidth: 420,
  maxHeight: '85%',
  backgroundColor: theme.colors.background,
  borderColor: '#20160c',
  borderWidth: 4,
  padding: 24,
})

export const DialogTitle = styled.Text({
  ...TypographyVariantStyles[TypographyVariant.H3],
  textAlign: 'center',
  marginBottom: 16,
})

export const DialogText = styled.Text({
  ...TypographyVariantStyles[TypographyVariant.BODY1],
  textAlign: 'center',
  marginBottom: 24,
})

export const ScreenScroll = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1, alignItems: 'center', padding: 24 },
})({})

export const Tagline = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.H4, $compact),
  color: '#f9e7c6',
  textAlign: 'center',
  letterSpacing: 1,
  textShadow: '2px 3px 1px #2c170e',
}))

export const FooterText = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.H5, $compact),
  textAlign: 'center',
  letterSpacing: 0.5,
}))

export const Rivet = styled.View.attrs({ pointerEvents: 'none' })<{
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

export const ButtonOutline = styled.Pressable.attrs({ style: pressedStyle })({
  borderWidth: 3,
  borderColor: '#171309',
  borderRadius: 6,
  boxShadow: '0px 5px 0px #b29e81',
  overflow: 'hidden',
})

export const AboutButton = styled.Pressable.attrs({ style: pressedStyle })({
  minHeight: 48,
  alignItems: 'center',
  justifyContent: 'center',
})

export const ButtonFace = styled.View<{ $primary: boolean }>(({ $primary }) => ({
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

export const ButtonLabel = styled.Text<{ $primary: boolean }>(({ $primary }) => ({
  ...TypographyVariantStyles[TypographyVariant.BUTTON],
  ...($primary
    ? {
        fontSize: TypographyVariantStyles[TypographyVariant.H1].fontSize,
        color: '#412704',
      }
    : { color: '#213b45' }),
}))
