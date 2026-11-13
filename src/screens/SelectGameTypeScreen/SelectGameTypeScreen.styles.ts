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
    padding: 20,
    paddingBottom: 32,
  },
})({})

export const Content = styled.View({
  width: '100%',
  maxWidth: 460,
  gap: 28,
})

export const Title = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  fontFamily: fonts.title,
  fontSize: $compact ? 36 : 44,
  color: '#f9e7c6',
  textAlign: 'center',
  textShadow: '2px 4px 0px #28180e',
}))

export const Panel = styled(Menu)({
  paddingHorizontal: 20,
  paddingBottom: 28,
  gap: 20,
})

export const OptionContent = styled.View({
  width: '100%',
  minHeight: 88,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 6,
  paddingVertical: 4,
})

export const OptionHeading = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
})

export const OptionTitle = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.BUTTON),
    fontSize: $compact ? 34 : 40,
  }),
)

export const OptionDescription = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.H5, $compact),
    textAlign: 'center',
  }),
)

export const Summary = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.BODY2),
  fontSize: $compact ? 18 : 22,
  textAlign: 'center',
  marginTop: 4,
}))

export const StartLabel = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.BUTTON),
    fontSize: $compact ? 28 : 34,
    color: '#412704',
  }),
)
