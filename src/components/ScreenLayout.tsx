import type { ReactNode } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const BackgroundContainer = styled.View({
  flex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
})

export const BackgroundImage = styled.Image({
  flex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
})

export const SafeArea = styled(SafeAreaView)({ flex: 1 })

export default function ScreenLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BackgroundContainer>
        <BackgroundImage
          source={require('../../assets/images/wood-texture.png')}
          resizeMode="repeat"
        />
      </BackgroundContainer>
      <StatusBar barStyle="light-content" />
      <SafeArea>{children}</SafeArea>
    </>
  )
}
