import PaperPanel from './PaperPanel'
import styled from 'styled-components/native'

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

export const Panel = styled(PaperPanel)({
  paddingHorizontal: 20,
  paddingTop: 44,
  paddingBottom: 24,
  gap: 20,
})

export const Divider = styled.View({ height: 2, backgroundColor: '#917451' })
