import {
  Content,
  Header,
  Panel,
  ScreenScroll,
  Title,
} from '../../components/FormScreen.styles'
import {
  DialogPanel,
  DialogTitle,
  DialogText,
  ModalBackdrop,
} from '../../components/Dialog.styles'
import { ButtonLabel, ButtonContent } from '../../components/Common.styles'
import BackButton from '../../components/BackButton'
import ScreenLayout from '../../components/ScreenLayout'
import type { StackScreenProps } from '@react-navigation/stack'
import { useIntl } from 'react-intl'
import { Modal, ScrollView } from 'react-native'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import type { MainStackParamList } from '../../navigation/MainStack'
import { useSettingsRepository } from '../../repositories/settingsRepository'
import { ModalActions } from './ConfigScreen.styles'
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
      <ScreenLayout>
        <ScreenScroll>
          <Content>
            <BackButton
              label={intl.formatMessage(messages.back)}
              onPress={() => navigation.goBack()}
            />
            <Header>
              <Title $compact={compact} accessibilityRole="header">
                {intl.formatMessage(messages.title)}
              </Title>
            </Header>
            <Panel>
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
      </ScreenLayout>
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
