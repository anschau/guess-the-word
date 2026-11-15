import PaperPanel from './PaperPanel'
import styled from 'styled-components/native'
import { fonts } from '../theme/typography'
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

export const Header = styled.View({ alignItems: 'center', gap: 12 })

export const Title = styled.Text<{ $compact: boolean }>(({ $compact }) => ({
  fontFamily: fonts.title,
  fontSize: $compact ? 38 : 46,
  color: '#f9e7c6',
  textAlign: 'center',
  textShadow: '2px 4px 0px #28180e',
}))

export const Panel = styled(PaperPanel)({
  paddingHorizontal: 22,
  paddingBottom: 28,
  gap: 24,
})
