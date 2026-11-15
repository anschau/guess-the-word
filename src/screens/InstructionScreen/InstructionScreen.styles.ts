import styled from 'styled-components/native'
import {
  fonts,
  getTextVariantStyles,
  TypographyVariant,
} from '../../theme/typography'

export const Header = styled.View({ gap: 4 })

export const Title = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  fontFamily: fonts.title,
  fontSize: $compact ? 40 : 48,
  color: '#f9e7c6',
  textAlign: 'center',
  textShadow: '2px 4px 0px #28180e',
}))

export const Section = styled.View({ gap: 6 })

export const StepTitle = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.H4, $compact),
}))

export const SectionTitle = styled(StepTitle)({ color: '#092d4e' })

export const Body = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.BODY2),
  fontSize: $compact ? 20 : 22,
  lineHeight: $compact ? '24px' : '27px',
}))

export const Score = styled.Text({ fontSize: 28 })

export const ConfirmLabel = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.BUTTON),
    fontSize: $compact ? 40 : 48,
    color: '#412704',
  }),
)
