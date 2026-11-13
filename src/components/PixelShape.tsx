import { StyleSheet, View } from 'react-native'

const step = 3

// Fixed-size corner steps and stretching edges keep the pixel outline crisp
// at any width or content height, without measuring or scaling an image.
export default function PixelShape({
  palette,
  shadow = false,
  outline = '#171309',
  shadowColor = '#28180e',
  bevelHeight = 4,
}: {
  palette: { face: string; light: string; shade: string }
  outline?: string
  shadowColor?: string
  bevelHeight?: number
  shadow?: boolean
}) {
  const edge = shadow ? shadowColor : outline
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {[0, 1, 2].map(row => (
        <View key={row} style={StyleSheet.absoluteFill}>
          <View
            style={[
              styles.band,
              {
                top: row * step,
                left: (3 - row) * step,
                right: (3 - row) * step,
                backgroundColor: shadow || row === 0 ? edge : palette.light,
                borderColor: edge,
              },
            ]}
          />
          <View
            style={[
              styles.band,
              {
                bottom: row * step,
                left: (3 - row) * step,
                right: (3 - row) * step,
                backgroundColor: shadow || row === 0 ? edge : palette.shade,
                borderColor: edge,
              },
            ]}
          />
        </View>
      ))}
      <View
        style={[
          styles.middle,
          {
            backgroundColor: shadow ? edge : palette.face,
            borderColor: edge,
          },
        ]}
      >
        <View
          style={[
            styles.bevel,
            {
              backgroundColor: shadow ? edge : palette.shade,
              height: bevelHeight,
            },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  band: {
    position: 'absolute',
    height: step,
    borderLeftWidth: step,
    borderRightWidth: step,
  },
  middle: {
    position: 'absolute',
    top: 9,
    bottom: 9,
    left: 0,
    right: 0,
    borderLeftWidth: step,
    borderRightWidth: step,
  },
  bevel: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 4 },
})
