import type { ViewProps } from 'react-native'
import styled from 'styled-components/native'
import { theme } from '../theme/theme'

const Surface = styled.View({
  backgroundColor: theme.colors.background,
  borderWidth: 3,
  borderColor: theme.colors.border,
  paddingHorizontal: 24,
  paddingTop: 40,
  paddingBottom: 16,
  gap: 16,
  marginHorizontal: 5,
  boxShadow: `3px 6px 0px ${theme.colors.shadow}`,
})

export const PaperTop = styled.View.attrs({ pointerEvents: 'none' })({
  position: 'absolute',
  height: 7,
  top: -7,
  left: 18,
  right: 18,
  backgroundColor: theme.colors.background,
  borderTopWidth: 3,
  borderColor: theme.colors.border,
})

export const PaperBottom = styled.View.attrs({ pointerEvents: 'none' })({
  position: 'absolute',
  height: 7,
  bottom: -7,
  left: 22,
  right: 14,
  backgroundColor: theme.colors.background,
  borderBottomWidth: 3,
  borderColor: theme.colors.border,
})

export const Rivet = styled.View.attrs({ pointerEvents: 'none' })<{
  $side: 'left' | 'right'
}>(({ $side }) => ({
  ...{
    position: 'absolute',
    top: 7,
    width: 20,
    height: 22,
    backgroundColor: '#737777',
    borderColor: '#171711',
    borderWidth: 3,
    borderRadius: 7,
    boxShadow: '1px 2px 0px #a89779',
    borderTopColor: '#a0a3a1',
  },
  ...($side === 'left' ? { left: 9 } : { right: 9 }),
}))

export function PaperEdges() {
  return (
    <>
      <PaperTop />
      <PaperBottom />
    </>
  )
}

export default function PaperPanel({ children, ...props }: ViewProps) {
  return (
    <Surface {...props}>
      <PaperEdges />
      <Rivet $side="left" />
      <Rivet $side="right" />
      {children}
    </Surface>
  )
}
