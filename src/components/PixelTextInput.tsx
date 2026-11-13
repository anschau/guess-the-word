import type { ComponentPropsWithRef } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { theme } from '../theme/theme'
import { TypographyVariantStyles, TypographyVariant } from '../theme/typography'
import PixelShape from './PixelShape'

type PixelTextInputProps = ComponentPropsWithRef<typeof TextInput> & {
  invalid?: boolean
}

const palette = { face: '#fcebcf', light: '#fcebcf', shade: '#e1c9a6' }

export default function PixelTextInput({
  invalid = false,
  ref,
  style,
  ...props
}: PixelTextInputProps) {
  return (
    <View style={styles.container}>
      <View pointerEvents="none" style={styles.shadow}>
        <PixelShape palette={palette} shadow shadowColor="#b29e81" />
      </View>
      <View>
        <PixelShape
          palette={palette}
          outline={invalid ? '#9b3526' : theme.colors.border}
          bevelHeight={1}
        />
        <TextInput
          {...props}
          ref={ref}
          underlineColorAndroid="transparent"
          style={[styles.input, style]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingBottom: 4 },
  shadow: { position: 'absolute', top: 4, bottom: 0, left: 0, right: 0 },
  input: {
    ...TypographyVariantStyles[TypographyVariant.BODY1],
    backgroundColor: 'transparent',
    minHeight: 56,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
})
