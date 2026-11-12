import { useState } from 'react'
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fonts } from '../../theme/typography'

type MainScreenProps = { onPlay?: () => void }
type Dialog = 'play' | 'instructions' | 'about'

const dialogs = {
  play: {
    title: 'Vamos jogar?',
    text: 'A partida ainda está em preparação. Em breve, você poderá reunir os amigos e começar a jogar por aqui!',
  },
  instructions: {
    title: 'Instruções',
    text: 'Um celular, amigos reunidos e inglês na ponta da língua! A proposta é aprender inglês tentando adivinhar palavras juntos. As regras da partida estarão disponíveis em breve.',
  },
  about: {
    title: 'Sobre o jogo',
    text: 'Guess the Word é um jogo para aprender inglês com amigos. Transforme o tempo juntos em uma oportunidade de descobrir novas palavras!',
  },
}

function MenuButton({
  label,
  primary = false,
  onPress,
}: {
  label: string
  primary?: boolean
  onPress: () => void
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.buttonOutline, pressed && styles.pressed]}
    >
      <View
        style={[
          styles.buttonFace,
          primary ? styles.primaryFace : styles.secondaryFace,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            primary ? styles.playText : styles.instructionsText,
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  )
}

export default function MainScreen({ onPlay }: MainScreenProps) {
  const [dialog, setDialog] = useState<Dialog | null>(null)
  const { width } = useWindowDimensions()
  const compact = width < 360
	

  return (
    <>
			<View style={styles.viewImageBackground}>
				<Image source={require('../../../assets/images/wood-texture.png')} style={styles.imageBackground} resizeMode='repeat' />
			</View>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Image
                source={require('../../../assets/images/game-logo.png')}
                accessibilityLabel="Guess the Word"
                style={styles.logo}
              />
              <Text style={[styles.tagline, compact && styles.compactTagline]}>
                {'Aprenda inglês\njogando com amigos'}
              </Text>
            </View>
            <View style={styles.menu}>
              <View pointerEvents="none" style={styles.paperTop} />
              <View pointerEvents="none" style={styles.paperBottom} />
              <View
                pointerEvents="none"
                style={[styles.rivet, styles.rivetLeft]}
              />
              <View
                pointerEvents="none"
                style={[styles.rivet, styles.rivetRight]}
              />
              <MenuButton
                label="Jogar"
                primary
                onPress={() => (onPlay ? onPlay() : setDialog('play'))}
              />
              <MenuButton
                label="Instruções"
                onPress={() => setDialog('instructions')}
              />
              <Pressable
                accessibilityRole="button"
                onPress={() => setDialog('about')}
                style={({ pressed }) => [
                  styles.aboutButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.aboutText}>Sobre</Text>
              </Pressable>
            </View>
            <View style={styles.footer}>
              <View pointerEvents="none" style={styles.paperTop} />
              <View pointerEvents="none" style={styles.paperBottom} />
              <Text
                style={[styles.footerText, compact && styles.compactFooter]}
              >
                {'Um celular, amigos\nreunidos e inglês\nna ponta da língua.'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal
        transparent
        visible={dialog !== null}
        animationType="fade"
        onRequestClose={() => setDialog(null)}
      >
        <View style={styles.modalBackdrop}>
          <View accessibilityViewIsModal style={styles.dialog}>
            <ScrollView>
              <Text accessibilityRole="header" style={styles.dialogTitle}>
                {dialog && dialogs[dialog].title}
              </Text>
              <Text style={styles.dialogText}>
                {dialog && dialogs[dialog].text}
              </Text>
              <MenuButton label="Voltar" onPress={() => setDialog(null)} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
	viewImageBackground: { flex: 1, width: '100%', height: '100%', position: 'absolute' },
	imageBackground: { flex: 1, width: '100%', height: '100%', position: 'absolute' },
  background: { flex: 1, backgroundColor: '#442411' },
  safeArea: { flex: 1 },
  scrollContent: { flexGrow: 1, alignItems: 'center', padding: 24 },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 460,
    justifyContent: 'space-between',
    gap: 30,
  },
  header: { alignItems: 'center', gap: 30 },
  logo: {
    resizeMode: 'contain',
    width: '100%',
    height: 'auto',
    aspectRatio: 830 / 365,
  },
  tagline: {
    fontFamily: fonts.text,
    color: '#f9e7c6',
    fontSize: 32,
    lineHeight: 34,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: '#2c170e',
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 1,
  },
  compactTagline: { fontSize: 27, lineHeight: 30 },
  menu: {
    backgroundColor: '#e7d0ae',
    borderWidth: 3,
    borderColor: '#1e140b',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
    gap: 16,
    marginHorizontal: 5,
    boxShadow: '3px 6px 0px #28180e',
  },
  paperTop: {
    position: 'absolute',
    height: 7,
    top: -7,
    left: 18,
    right: 18,
    backgroundColor: '#e7d0ae',
    borderTopWidth: 3,
    borderColor: '#1e140b',
  },
  paperBottom: {
    position: 'absolute',
    height: 7,
    bottom: -7,
    left: 22,
    right: 14,
    backgroundColor: '#e7d0ae',
    borderBottomWidth: 3,
    borderColor: '#1e140b',
  },
  rivet: {
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
  rivetLeft: { left: 9 },
  rivetRight: { right: 9 },
  buttonOutline: {
    borderWidth: 3,
    borderColor: '#171309',
    borderRadius: 6,
    boxShadow: '0px 5px 0px #b29e81',
    overflow: 'hidden',
  },
  buttonFace: {
    borderTopWidth: 2,
    borderBottomWidth: 7,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryFace: {
    backgroundColor: '#e3b550',
    borderTopColor: '#f2cf7c',
    borderBottomColor: '#b98c36',
    minHeight: 76,
  },
  secondaryFace: {
    backgroundColor: '#a7c6d0',
    borderTopColor: '#c0d9df',
    borderBottomColor: '#7c9da7',
    minHeight: 54,
  },
  buttonText: { fontFamily: fonts.title, textAlign: 'center' },
  playText: { fontSize: 54, color: '#412704' },
  instructionsText: { fontSize: 33, color: '#213b45' },
  pressed: { transform: [{ translateY: 3 }], opacity: 0.85 },
  aboutButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutText: { fontFamily: fonts.title, fontSize: 38, color: '#382313' },
  footer: {
    backgroundColor: '#e7d0ae',
    borderColor: '#1e140b',
    borderWidth: 3,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginHorizontal: 8,
    marginBottom: 9,
    boxShadow: '2px 5px 0px #28180e',
  },
  footerText: {
    fontFamily: fonts.text,
    color: '#382313',
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 29,
    letterSpacing: 0.5,
  },
  compactFooter: { fontSize: 25, lineHeight: 27 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#160d09cc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  dialog: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '85%',
    backgroundColor: '#e7d0ae',
    borderColor: '#20160c',
    borderWidth: 4,
    padding: 24,
  },
  dialogTitle: {
    fontFamily: fonts.text,
    fontSize: 36,
    color: '#382313',
    textAlign: 'center',
    marginBottom: 16,
  },
  dialogText: {
    fontFamily: fonts.text,
    fontSize: 26,
    color: '#382313',
    textAlign: 'center',
    marginBottom: 24,
  },
})
