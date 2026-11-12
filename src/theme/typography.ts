import { StyleSheet } from 'react-native'

export const fonts = {
  text: 'MotionControl-Bold',
  title: 'Ithaca',
} as const

export const typography = StyleSheet.create({
  text: {
    fontFamily: fonts.text,
  },
  title: {
    fontFamily: fonts.title,
  },
})
