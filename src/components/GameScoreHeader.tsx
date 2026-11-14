import { useState, type ReactNode } from 'react'
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static'
import { Modal, ScrollView } from 'react-native'
import { useIntl } from 'react-intl'
import styled from 'styled-components/native'
import { useGameRepository } from '../repositories/gameRepository'
import {
  DialogPanel,
  DialogTitle,
  ModalBackdrop,
} from '../screens/MainScreen/MainScreen.styles'
import { getTextVariantStyles, TypographyVariant } from '../theme/typography'
import { theme } from '../theme/theme'
import GameScore from './GameScore'
import messages from './GameScore.messages'
import PixelButton from './PixelButton'

export default function GameScoreHeader({ children }: { children: ReactNode }) {
  const intl = useIntl()
  const [visible, setVisible] = useState(false)
  const game = useGameRepository(state => state.currentGame)

  return (
    <>
      <HeaderRow>
        <HeaderContent>{children}</HeaderContent>
        <PixelButton
          variant="neutral"
          accessibilityLabel={intl.formatMessage(messages.open)}
          onPress={() => setVisible(true)}
        >
          <FontAwesome
            name="trophy"
            size={24}
            color={theme.colors.text}
            accessible={false}
          />
        </PixelButton>
      </HeaderRow>
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <ModalBackdrop>
          <DialogPanel accessibilityViewIsModal>
            <DialogTitle accessibilityRole="header">
              {intl.formatMessage(messages.current)}
            </DialogTitle>
            <ScrollView>
              <GameScore players={game?.players ?? []} />
            </ScrollView>
            <CloseButton onPress={() => setVisible(false)}>
              <CloseLabel>{intl.formatMessage(messages.close)}</CloseLabel>
            </CloseButton>
          </DialogPanel>
        </ModalBackdrop>
      </Modal>
    </>
  )
}

const HeaderRow = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
})
const HeaderContent = styled.View({ flex: 1 })
const CloseButton = styled(PixelButton)({ marginTop: 20 })
const CloseLabel = styled.Text({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  color: '#213b45',
})
