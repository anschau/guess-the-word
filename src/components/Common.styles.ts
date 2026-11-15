import styled from 'styled-components/native'
import { TypographyVariant, TypographyVariantStyles } from '../theme/typography'
export const Logo = styled.Image({
  resizeMode: 'contain',
  width: '100%',
  height: 'auto',
  aspectRatio: 830 / 365,
})

export const ButtonLabel = styled.Text<{ $primary: boolean }>(
  ({ $primary }) => ({
    ...TypographyVariantStyles[TypographyVariant.BUTTON],
    ...($primary
      ? {
          fontSize: TypographyVariantStyles[TypographyVariant.H1].fontSize,
          color: '#412704',
        }
      : { color: '#213b45' }),
  }),
)

export const ButtonContent = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
})
