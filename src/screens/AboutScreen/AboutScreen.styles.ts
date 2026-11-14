import styled from 'styled-components/native'
import { Panel as InstructionPanel } from '../InstructionScreen/InstructionScreen.styles'
import { getTextVariantStyles, TypographyVariant } from '../../theme/typography'

export const Panel = styled(InstructionPanel)({ gap: 24 })

export const Title = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.H3),
  fontSize: $compact ? 30 : 36,
  textAlign: 'center',
}))

export const Body = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.BODY1),
  fontSize: $compact ? 22 : 26,
  textAlign: 'center',
}))

export const Author = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.H4, $compact),
  color: '#092d4e',
  textAlign: 'center',
}))

export const GitHubLabel = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  fontSize: $compact ? 23 : 27,
  color: '#412704',
  flexShrink: 1,
}))
