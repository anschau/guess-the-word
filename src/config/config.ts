import { useWindowDimensions } from 'react-native'

export const COMPACT_BREAKPOINT = 360

export function useCompact(): boolean {
  const { width } = useWindowDimensions()
  return width < COMPACT_BREAKPOINT
}
