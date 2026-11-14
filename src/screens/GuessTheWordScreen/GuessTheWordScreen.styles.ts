import styled from 'styled-components/native'
import { Menu } from '../MainScreen/MainScreen.styles'
import {
  fonts,
  getTextVariantStyles,
  TypographyVariant,
} from '../../theme/typography'

export const ScreenScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 28,
  },
})({})

export const Content = styled.View({ width: '100%', maxWidth: 460, gap: 24 })
export const Header = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  fontFamily: fonts.title,
  fontSize: $compact ? 23 : 28,
  textAlign: 'center',
  color: '#f9e7c6',
  textShadow: '2px 3px 0px #28180e',
}))
export const Highlight = styled.Text({ color: '#ffc531' })
export const Panel = styled(Menu)({
  paddingHorizontal: 18,
  paddingTop: 34,
  paddingBottom: 20,
  gap: 20,
})
export const Section = styled.View({ gap: 12, alignItems: 'center' })
export const Body = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.H5, $compact),
  textAlign: 'center',
}))
export const Legend = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.BODY2, $compact),
  textAlign: 'center',
}))
export const SecretWord = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.BUTTON),
    fontSize: $compact ? 32 : 40,
    color: '#9b0000',
  }),
)
export const ClueLabel = styled.Text<{ $compact: boolean }>(() => ({
  ...getTextVariantStyles(TypographyVariant.BODY1)
}))
export const ClueTitle = styled.Text<{ $compact: boolean }>(() => ({
  ...getTextVariantStyles(TypographyVariant.H2),
  textAlign: 'center',
  color: '#9b0000',
}))
export const ClueText = styled(Body)({ color: '#a58151', fontSize: 30 })
export const Divider = styled.View({
  height: 2,
  backgroundColor: '#97775a',
  width: '100%',
})
export const Actions = styled.View({ gap: 12 })
export const ButtonLabel = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.BUTTON),
    fontSize: $compact ? 27 : 32,
    color: '#412704',
  }),
)
export const SecondaryLabel = styled(ButtonLabel)({ color: '#213b45' })
export const Footer = styled(Body)({
  color: '#f9e7c6',
  textShadow: '2px 3px 0px #28180e',
})
