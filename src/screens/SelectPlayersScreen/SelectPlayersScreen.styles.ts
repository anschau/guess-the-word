import styled from 'styled-components/native'
import { theme } from '../../theme/theme'
import {
  fonts,
  getTextVariantStyles,
  TypographyVariant,
} from '../../theme/typography'
import { ButtonOutline, Menu } from '../MainScreen/MainScreen.styles'

export const KeyboardContainer = styled.KeyboardAvoidingView({ flex: 1 })

export const ScreenScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 32,
  },
  keyboardShouldPersistTaps: 'handled',
})({})

export const Content = styled.View({
  width: '100%',
  maxWidth: 460,
  gap: 24,
})

export const BackButton = styled(ButtonOutline)({ alignSelf: 'flex-start' })

export const BackFace = styled.View({
  backgroundColor: theme.colors.background,
  borderTopWidth: 2,
  borderTopColor: '#f9e7c6',
  borderBottomWidth: 4,
  borderBottomColor: '#b29e81',
  paddingHorizontal: 14,
  minHeight: 40,
  justifyContent: 'center',
})

export const BackLabel = styled.Text({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  fontSize: 25,
})

export const Header = styled.View({ alignItems: 'center', gap: 12 })

export const Title = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  fontFamily: fonts.title,
  fontSize: $compact ? 38 : 46,
  color: '#f9e7c6',
  textAlign: 'center',
  textShadow: '2px 4px 0px #28180e',
}))

export const Subtitle = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.H5, $compact),
  color: '#f9e7c6',
  textAlign: 'center',
}))

export const Panel = styled(Menu)({
  paddingHorizontal: 22,
  paddingBottom: 28,
  gap: 24,
})

export const Field = styled.View({ gap: 8 })

export const Label = styled.Text({
  ...getTextVariantStyles(TypographyVariant.H5),
  fontFamily: fonts.title,
})

export const Input = styled.TextInput<{ $invalid: boolean }>(
  ({ $invalid }) => ({
    ...getTextVariantStyles(TypographyVariant.BODY1),
    backgroundColor: '#fcebcf',
    borderColor: $invalid ? '#9b3526' : theme.colors.border,
    borderWidth: 3,
    borderRadius: 6,
    minHeight: 56,
    paddingHorizontal: 12,
    paddingVertical: 8,
    boxShadow: '0px 4px 0px #b29e81',
  }),
)

export const AddLabel = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  fontSize: $compact ? 20 : 24,
  color: '#213b45',
}))

export const ErrorText = styled.Text({
  ...getTextVariantStyles(TypographyVariant.CAPTION),
  color: '#9b3526',
})
