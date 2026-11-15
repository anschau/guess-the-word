import PaperPanel from '../../components/PaperPanel'
import type { PressableStateCallbackType } from 'react-native'
import styled from 'styled-components/native'
import { theme } from '../../theme/theme'
import {
  getTextVariantStyles,
  TypographyVariant,
  TypographyVariantStyles,
} from '../../theme/typography'

export const Content = styled.View({
  flexGrow: 1,
  width: '100%',
  maxWidth: 460,
  justifyContent: 'space-between',
  gap: 30,
})

export const Header = styled.View({ alignItems: 'center', gap: 30 })

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

export const FooterText = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.H5, $compact),
    textAlign: 'center',
    letterSpacing: 0.5,
  }),
)

const pressedStyle = ({ pressed }: PressableStateCallbackType) =>
  pressed ? { transform: [{ translateY: 3 }], opacity: 0.85 } : undefined

export const AboutButton = styled.Pressable.attrs({ style: pressedStyle })({
  minHeight: 48,
  alignItems: 'center',
  justifyContent: 'center',
})

export const Menu = PaperPanel
