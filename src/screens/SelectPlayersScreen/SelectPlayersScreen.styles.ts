import styled from 'styled-components/native'

import {
  fonts,
  getTextVariantStyles,
  TypographyVariant,
} from '../../theme/typography'
import { Menu } from '../MainScreen/MainScreen.styles'
import PixelButton from '../../components/PixelButton'

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

export const BackButton = styled(PixelButton)({ alignSelf: 'flex-start' })

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

export const AddLabel = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  fontSize: $compact ? 20 : 24,
  color: '#213b45',
}))

export const ErrorText = styled.Text({
  ...getTextVariantStyles(TypographyVariant.CAPTION),
  color: '#9b3526',
})
