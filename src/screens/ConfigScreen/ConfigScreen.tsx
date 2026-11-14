import { FontAwesome } from '@react-native-vector-icons/fontawesome/static'
import type { StackScreenProps } from '@react-navigation/stack'
import { useIntl } from 'react-intl'
import { Modal, ScrollView, StatusBar } from 'react-native'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import type { MainStackParamList } from '../../navigation/MainStack'
import { theme } from '../../theme/theme'
import { useSettingsRepository } from '../../repositories/settingsRepository'
import {
  BackgroundContainer,
  BackgroundImage,
  ButtonLabel,
  DialogPanel,
  DialogTitle,
  DialogText,
  ModalBackdrop,
  PaperBottom,
  PaperTop,
  Rivet,
  SafeArea,
} from '../MainScreen/MainScreen.styles'
import {
  BackButton,
  BackLabel,
  ButtonContent,
  Content,
  Header,
  Panel,
  ScreenScroll,
  Title,
  ModalActions,
} from './ConfigScreen.styles'
import messages from './messages'

type ConfigScreenProps = StackScreenProps<MainStackParamList, 'Config'>

export default function ConfigScreen({ navigation }: ConfigScreenProps) {
  const intl = useIntl()
  const compact = useCompact()
  const rounds = useSettingsRepository(state => state.rounds)
  const setRounds = useSettingsRepository(state => state.setRounds)
  const [roundsModalVisible, setRoundsModalVisible] = useState(false)
  const [draftRounds, setDraftRounds] = useState(rounds)

  return (
    <>
      <BackgroundContainer>
        <BackgroundImage
          source={require('../../../assets/images/wood-texture.png')}
          resizeMode="repeat"
        />
      </BackgroundContainer>
      <StatusBar barStyle="light-content" />
      <SafeArea>
        <ScreenScroll>
          <Content>
            <BackButton
              variant="neutral"
              accessibilityLabel={intl.formatMessage(messages.back)}
              onPress={() => navigation.goBack()}
            >
              <ButtonContent>
                <FontAwesome
                  name="arrow-left"
                  size={20}
                  color={theme.colors.text}
                  accessible={false}
                />
                <BackLabel>{intl.formatMessage(messages.back)}</BackLabel>
              </ButtonContent>
            </BackButton>
            <Header>
              <Title $compact={compact} accessibilityRole="header">
                {intl.formatMessage(messages.title)}
              </Title>
            </Header>
            <Panel>
              <PaperTop />
              <PaperBottom />
              <Rivet $side="left" />
              <Rivet $side="right" />
              <PixelButton
                onPress={() =>
                  navigation.navigate('SelectPlayers', { mode: 'config' })
                }
              >
                <ButtonLabel $primary={false}>
                  {intl.formatMessage(messages.defaultPlayers)}
                </ButtonLabel>
              </PixelButton>
              <PixelButton
                onPress={() => {
                  setDraftRounds(rounds)
                  setRoundsModalVisible(true)
                }}
                accessibilityLabel={intl.formatMessage(messages.rounds)}
              >
                <ButtonLabel $primary={false}>
                  {intl.formatMessage(messages.roundsValue, { rounds })}
                </ButtonLabel>
              </PixelButton>
            </Panel>
          </Content>
        </ScreenScroll>
      </SafeArea>
      <Modal
        transparent
        animationType="fade"
        visible={roundsModalVisible}
        onRequestClose={() => setRoundsModalVisible(false)}
      >
        <ModalBackdrop>
          <DialogPanel accessibilityViewIsModal>
            <ScrollView>
              <DialogTitle accessibilityRole="header">
                {intl.formatMessage(messages.rounds)}
              </DialogTitle>
              <DialogText accessibilityLiveRegion="polite">
                {draftRounds}
              </DialogText>
              <ModalActions>
                <ButtonContent>
                  <PixelButton
                    accessibilityLabel={intl.formatMessage(messages.decrease)}
                    disabled={draftRounds <= 1}
                    onPress={() =>
                      setDraftRounds(value => Math.max(1, value - 1))
                    }
                  >
                    <ButtonLabel $primary={false}>−</ButtonLabel>
                  </PixelButton>
                  <PixelButton
                    accessibilityLabel={intl.formatMessage(messages.increase)}
                    disabled={draftRounds >= Number.MAX_SAFE_INTEGER}
                    onPress={() => setDraftRounds(value => value + 1)}
                  >
                    <ButtonLabel $primary={false}>+</ButtonLabel>
                  </PixelButton>
                </ButtonContent>
                <PixelButton
                  variant="primary"
                  accessibilityLabel={intl.formatMessage(messages.save)}
                  onPress={() => {
                    setRounds(draftRounds)
                    setRoundsModalVisible(false)
                  }}
                >
                  <ButtonLabel $primary>
                    {intl.formatMessage(messages.save)}
                  </ButtonLabel>
                </PixelButton>
                <PixelButton onPress={() => setRoundsModalVisible(false)}>
                  <ButtonLabel $primary={false}>
                    {intl.formatMessage(messages.cancel)}
                  </ButtonLabel>
                </PixelButton>
              </ModalActions>
            </ScrollView>
          </DialogPanel>
        </ModalBackdrop>
      </Modal>
    </>
  )
}
import { useState } from 'react'
