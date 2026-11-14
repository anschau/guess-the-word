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
export const Panel = styled(Menu)({
  paddingHorizontal: 18,
  paddingTop: 36,
  paddingBottom: 24,
  gap: 22,
})
export const Celebration = styled.View({ alignItems: 'center', gap: 12 })
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
}))
export const Body = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.H5, $compact),
  textAlign: 'center',
}))
export const Divider = styled.View({ height: 2, backgroundColor: '#896447' })
export const Ranking = styled.View({ gap: 14 })
export const RankingTitle = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.BUTTON),
    fontSize: $compact ? 28 : 34,
    marginBottom: 4,
  }),
)
export const ScoreRow = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
})
export const Position = styled.Text({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  minWidth: 36,
})
export const PlayerScore = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.H5, $compact),
  }),
)
export const Actions = styled.View({ gap: 14 })
export const ButtonLabel = styled.Text<{
  $compact: boolean
  $primary?: boolean
}>(({ $compact, $primary }) => ({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  fontSize: $compact ? 27 : 33,
  color: $primary ? '#412704' : '#213b45',
}))
