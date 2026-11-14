import styled from 'styled-components/native'
import { getTextVariantStyles, TypographyVariant } from '../theme/typography'

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
    flexShrink: 1,
  }),
)
