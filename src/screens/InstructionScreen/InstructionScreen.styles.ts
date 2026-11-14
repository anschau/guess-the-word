import styled from 'styled-components/native'
import { Menu } from '../MainScreen/MainScreen.styles'
import {
  fonts,
  getTextVariantStyles,
  TypographyVariant,
} from '../../theme/typography'
import PixelButton from '../../components/PixelButton'

export const ScreenScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
})({})

export const Content = styled.View({ width: '100%', maxWidth: 460, gap: 24 })

export const Header = styled.View({ gap: 4 })

export const BackLabel = styled.Text({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  fontSize: 25,
})

export const BackButton = styled(PixelButton)({ alignSelf: 'flex-start' })

export const ButtonContent = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
})

export const Title = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  fontFamily: fonts.title,
  fontSize: $compact ? 40 : 48,
  color: '#f9e7c6',
  textAlign: 'center',
  textShadow: '2px 4px 0px #28180e',
}))

export const Panel = styled(Menu)({
  paddingHorizontal: 20,
  paddingTop: 44,
  paddingBottom: 24,
  gap: 20,
})

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

export const Divider = styled.View({ height: 2, backgroundColor: '#917451' })

export const ConfirmLabel = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.BUTTON),
    fontSize: $compact ? 40 : 48,
    color: '#412704',
  }),
)
