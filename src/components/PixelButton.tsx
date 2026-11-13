import PixelShape from './PixelShape'
import type { ReactNode } from 'react'
import { Pressable, StyleSheet, View, type PressableProps } from 'react-native'

type Variant = 'primary' | 'secondary' | 'neutral'
type PixelButtonProps = Omit<PressableProps, 'children'> & {
  children: ReactNode
  variant?: Variant
}

const palettes = {
  primary: { face: '#e3b550', light: '#f2cf7c', shade: '#b98c36' },
  secondary: { face: '#a7c6d0', light: '#c0d9df', shade: '#7c9da7' },
  neutral: { face: '#e7d0ae', light: '#f9e7c6', shade: '#b29e81' },
}
export default function PixelButton({
  children,
  variant = 'secondary',
  style,
  disabled,
  accessibilityState,
  ...props
}: PixelButtonProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, disabled: !!disabled }}
      disabled={disabled}
      style={state => [
        styles.button,
        disabled && styles.disabled,
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      {({ pressed }) => (
        <>
          <View pointerEvents="none" style={styles.shadow}>
            <PixelShape palette={palettes[variant]} shadow />
          </View>
          <View style={[styles.face, pressed && styles.pressed]}>
            <PixelShape palette={palettes[variant]} />
            <View
              style={[
                styles.content,
                variant === 'primary' && styles.primary,
                variant === 'neutral' && styles.neutral,
              ]}
            >
              {children}
            </View>
          </View>
        </>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: { paddingBottom: 4 },
  face: { position: 'relative' },
  pressed: { transform: [{ translateY: 3 }] },
  disabled: { opacity: 0.5 },
  shadow: { position: 'absolute', top: 4, bottom: 0, left: 0, right: 0 },
  content: {
    minHeight: 60,
    paddingHorizontal: 15,
    paddingTop: 9,
    paddingBottom: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { minHeight: 82 },
  neutral: { minHeight: 46 },
})
