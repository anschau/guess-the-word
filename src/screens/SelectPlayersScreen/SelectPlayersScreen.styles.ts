import styled from 'styled-components/native'
import {
  fonts,
  getTextVariantStyles,
  TypographyVariant,
} from '../../theme/typography'

export const KeyboardContainer = styled.KeyboardAvoidingView({ flex: 1 })

export const Subtitle = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.H5, $compact),
  color: '#f9e7c6',
  textAlign: 'center',
}))

export const Field = styled.View({ gap: 8 })

export const Label = styled.Text({
  ...getTextVariantStyles(TypographyVariant.H5),
  fontFamily: fonts.title,
})

export const AddLabel = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  fontSize: $compact ? 20 : 24,
  color: '#213b45',
}))

export const ErrorText = styled.Text({
  ...getTextVariantStyles(TypographyVariant.CAPTION),
  color: '#9b3526',
})
