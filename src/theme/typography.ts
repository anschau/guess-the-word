import type { TextStyle } from 'react-native'
import { theme } from './theme'

export const fonts = {
  text: 'MotionControl-Bold',
  title: 'Ithaca',
} as const

export enum TypographyVariant {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  SUBTITLE1 = 'subtitle1',
  SUBTITLE2 = 'subtitle2',
  BODY1 = 'body1',
  BODY2 = 'body2',
  BUTTON = 'button',
  CAPTION = 'caption',
  OVERLINE = 'overline',
}

const baseText = {
  fontFamily: fonts.text,
  color: theme.colors.text,
} satisfies TextStyle

export const TypographyVariantStyles = {
  [TypographyVariant.H1]: { ...baseText, fontSize: 54 },
  [TypographyVariant.H2]: { ...baseText, fontSize: 38 },
  [TypographyVariant.H3]: { ...baseText, fontSize: 36 },
  [TypographyVariant.H4]: { ...baseText, fontSize: 32, lineHeight: 34 },
  [TypographyVariant.H5]: { ...baseText, fontSize: 28, lineHeight: 29 },
  [TypographyVariant.H6]: { ...baseText, fontSize: 26 },
  [TypographyVariant.SUBTITLE1]: { ...baseText, fontSize: 27, lineHeight: 30 },
  [TypographyVariant.SUBTITLE2]: { ...baseText, fontSize: 25, lineHeight: 27 },
  [TypographyVariant.BODY1]: { ...baseText, fontSize: 26 },
  [TypographyVariant.BODY2]: { ...baseText, fontSize: 22 },
  [TypographyVariant.BUTTON]: {
    ...baseText,
    fontFamily: fonts.title,
    fontSize: 33,
    textAlign: 'center',
  },
  [TypographyVariant.CAPTION]: { ...baseText, fontSize: 18, lineHeight: 22 },
  [TypographyVariant.OVERLINE]: {
    ...baseText,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
} satisfies { [id: string]: TextStyle }

const compactOverrides: Partial<
  Record<TypographyVariant, { fontSize: number; lineHeight: number }>
> = {
  [TypographyVariant.H4]: { fontSize: 27, lineHeight: 30 },
  [TypographyVariant.H5]: { fontSize: 25, lineHeight: 27 },
}

// Resolves responsive typography and formats lineHeight for styled-components/native.
export function getTextVariantStyles(variant: TypographyVariant, compact = false) {
  const style = {
    ...TypographyVariantStyles[variant],
    ...(compact ? compactOverrides[variant] : undefined),
  }

  return {
    ...style,
    ...(style.lineHeight !== undefined
      ? { lineHeight: `${style.lineHeight}px` }
      : { lineHeight: undefined }),
  }
}
