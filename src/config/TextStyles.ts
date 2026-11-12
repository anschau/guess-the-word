import type { TextStyle } from 'react-native'
import { fonts } from '../theme/typography'

export enum TextVariant {
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
  color: '#382313',
} satisfies TextStyle

export const TextVariantStyles = {
  [TextVariant.H1]: { ...baseText, fontSize: 54 },
  [TextVariant.H2]: { ...baseText, fontSize: 38 },
  [TextVariant.H3]: { ...baseText, fontSize: 36 },
  [TextVariant.H4]: { ...baseText, fontSize: 32, lineHeight: 34 },
  [TextVariant.H5]: { ...baseText, fontSize: 28, lineHeight: 29 },
  [TextVariant.H6]: { ...baseText, fontSize: 26 },
  [TextVariant.SUBTITLE1]: { ...baseText, fontSize: 27, lineHeight: 30 },
  [TextVariant.SUBTITLE2]: { ...baseText, fontSize: 25, lineHeight: 27 },
  [TextVariant.BODY1]: { ...baseText, fontSize: 26 },
  [TextVariant.BODY2]: { ...baseText, fontSize: 22 },
  [TextVariant.BUTTON]: {
    ...baseText,
    fontFamily: fonts.title,
    fontSize: 33,
    textAlign: 'center',
  },
  [TextVariant.CAPTION]: { ...baseText, fontSize: 18, lineHeight: 22 },
  [TextVariant.OVERLINE]: {
    ...baseText,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
} satisfies { [id: string]: TextStyle }

const compactOverrides: Partial<
  Record<TextVariant, { fontSize: number; lineHeight: number }>
> = {
  [TextVariant.H4]: { fontSize: 27, lineHeight: 30 },
  [TextVariant.H5]: { fontSize: 25, lineHeight: 27 },
}

// Resolves responsive typography and formats lineHeight for styled-components/native.
export function getTextVariantStyles(variant: TextVariant, compact = false) {
  const style = {
    ...TextVariantStyles[variant],
    ...(compact ? compactOverrides[variant] : undefined),
  }

  return {
    ...style,
    ...(style.lineHeight !== undefined
      ? { lineHeight: `${style.lineHeight}px` }
      : { lineHeight: undefined }),
  }
}
