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

export const Content = styled.View({
  width: '100%',
  maxWidth: 460,
  gap: 32,
})

export const RoundLabel = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    fontFamily: fonts.title,
    fontSize: $compact ? 30 : 36,
    color: '#f9e7c6',
    textAlign: 'center',
    textShadow: '2px 3px 0px #28180e',
  }),
)

export const RoundValue = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    fontSize: $compact ? 42 : 50,
    color: '#ffc531',
  }),
)

export const Panel = styled(Menu)({
  paddingHorizontal: 18,
  paddingTop: 44,
  paddingBottom: 28,
  gap: 32,
})

export const TurnTitle = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  fontSize: $compact ? 36 : 44,
}))

export const Handoff = styled.View({ alignItems: 'center', gap: 8 })

export const Instructions = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.H5, $compact),
    textAlign: 'center',
  }),
)

export const PlayerName = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.BUTTON),
    fontSize: $compact ? 32 : 40,
    color: '#092e49',
  }),
)

export const ConfirmLabel = styled.Text<{ $compact: boolean }>(
  ({ $compact }) => ({
    ...getTextVariantStyles(TypographyVariant.BUTTON),
    fontSize: $compact ? 26 : 32,
    color: '#412704',
  }),
)

export const Warning = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  fontSize: $compact ? 26 : 32,
  color: '#f9e7c6',
  textShadow: '2px 3px 0px #28180e',
}))
