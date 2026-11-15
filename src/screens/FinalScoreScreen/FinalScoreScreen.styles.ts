import styled from 'styled-components/native'
import PaperPanel from '../../components/PaperPanel'
import { theme } from '../../theme/theme'
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
    paddingVertical: 32,
  },
})({})

export const Content = styled.View({ width: '100%', maxWidth: 460, gap: 28 })
export const Title = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  fontFamily: fonts.title,
  fontSize: $compact ? 34 : 42,
  color: '#f9e7c6',
  textAlign: 'center',
  textShadow: '2px 3px 0px #28180e',
}))
export const Panel = styled(PaperPanel)({
  paddingHorizontal: 18,
  paddingTop: 36,
  paddingBottom: 24,
  gap: 22,
})
export const Celebration = styled.View({ alignItems: 'center', gap: 12 })
export const ResultCard = styled.View({
  backgroundColor: theme.colors.background,
  padding: 12,
  gap: 22,
})
export const Brand = styled.Text({
  fontFamily: fonts.title,
  fontSize: 32,
  color: '#092e49',
  textAlign: 'center',
})
export const Trophy = styled.Image<{ $compact: boolean }>(({ $compact }) => ({
  width: $compact ? 200 : 240,
  maxWidth: '100%',
  height: 'auto',
  aspectRatio: 2,
}))
export const Winner = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  fontSize: $compact ? 34 : 42,
  color: '#092e49',
  textAlign: 'center',
}))
export const Body = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.H5, $compact),
  textAlign: 'center',
}))
export const Divider = styled.View({ height: 2, backgroundColor: '#896447' })
export const Actions = styled.View({ gap: 14 })
export const ButtonLabel = styled.Text<{
  $compact: boolean
  $primary?: boolean
}>(({ $compact, $primary }) => ({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  fontSize: $compact ? 27 : 33,
  color: $primary ? '#412704' : '#213b45',
  textAlign: 'center',
}))
