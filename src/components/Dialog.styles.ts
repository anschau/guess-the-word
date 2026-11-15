import styled from 'styled-components/native'
import { theme } from '../theme/theme'
import { TypographyVariant, TypographyVariantStyles } from '../theme/typography'
export const ModalBackdrop = styled.View({
  flex: 1,
  backgroundColor: '#160d09cc',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 28,
})

export const DialogPanel = styled.View({
  width: '100%',
  maxWidth: 420,
  maxHeight: '85%',
  backgroundColor: theme.colors.background,
  borderColor: '#20160c',
  borderWidth: 4,
  padding: 24,
})

export const DialogTitle = styled.Text({
  ...TypographyVariantStyles[TypographyVariant.H3],
  textAlign: 'center',
  marginBottom: 16,
})

export const DialogText = styled.Text({
  ...TypographyVariantStyles[TypographyVariant.BODY1],
  textAlign: 'center',
  marginBottom: 24,
})
