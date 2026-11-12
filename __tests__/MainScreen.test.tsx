import React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import { StyleSheet, Text } from 'react-native'
import MainScreen from '../src/screens/MainScreen/MainScreen'
import { useCompact } from '../src/config/config'

jest.mock('../src/config/config', () => ({ useCompact: jest.fn() }))
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: require('react-native').View,
}))

test.each([false, true])(
  'preserves typography with compact=%s',
  async compact => {
    jest.mocked(useCompact).mockReturnValue(compact)
    let renderer!: ReactTestRenderer.ReactTestRenderer
    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<MainScreen />)
    })

    const textStyle = (label: string) => {
      const text = renderer.root
        .findAllByType(Text)
        .find(node => node.props.children === label)
      expect(text).toBeDefined()
      return StyleSheet.flatten(text!.props.style)
    }

    expect(textStyle('Jogar')).toMatchObject({
      fontFamily: 'Ithaca',
      fontSize: 54,
      color: '#412704',
    })
    expect(textStyle('Instruções')).toMatchObject({
      fontFamily: 'Ithaca',
      fontSize: 33,
      color: '#213b45',
    })
    expect(textStyle('Sobre')).toMatchObject({
      fontFamily: 'Ithaca',
      fontSize: 38,
    })
    expect(textStyle('Aprenda inglês\njogando com amigos')).toMatchObject({
      fontFamily: 'MotionControl-Bold',
      fontSize: compact ? 27 : 32,
      lineHeight: compact ? 30 : 34,
      color: '#f9e7c6',
      textAlign: 'center',
    })
    expect(
      textStyle('Um celular, amigos\nreunidos e inglês\nna ponta da língua.'),
    ).toMatchObject({
      fontFamily: 'MotionControl-Bold',
      fontSize: compact ? 25 : 28,
      lineHeight: compact ? 27 : 29,
      textAlign: 'center',
    })

    await ReactTestRenderer.act(() => renderer.unmount())
  },
)
