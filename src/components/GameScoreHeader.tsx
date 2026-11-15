import {
  DialogPanel,
  DialogTitle,
  DialogText,
  ModalBackdrop,
} from './Dialog.styles'
import { useState, type ReactNode } from 'react'
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static'
import { Modal, ScrollView } from 'react-native'
import { useIntl } from 'react-intl'
import styled from 'styled-components/native'
import { useGameRepository } from '../repositories/gameRepository'

import { getTextVariantStyles, TypographyVariant } from '../theme/typography'
import { theme } from '../theme/theme'
import GameScore from './GameScore'
import messages from './GameScore.messages'
import PixelButton from './PixelButton'

type Props = {
  children: ReactNode
  onGameEnded: (gameId: string) => void
}

export default function GameScoreHeader({ children, onGameEnded }: Props) {
  const intl = useIntl()
  const [dialog, setDialog] = useState<'score' | 'endGame' | null>(null)
  const game = useGameRepository(state => state.currentGame)

  function endGame() {
    const repository = useGameRepository.getState()
    const currentGame = repository.currentGame
    if (!currentGame) return
    repository.finishGame()
    setDialog(null)
    onGameEnded(currentGame.id)
  }

  return (
    <>
      <HeaderRow>
        <HeaderContent>{children}</HeaderContent>
        <PixelButton
          variant="neutral"
          accessibilityLabel={intl.formatMessage(messages.open)}
          onPress={() => setDialog('score')}
        >
          <FontAwesome
            name="trophy"
            size={24}
            color={theme.colors.text}
            accessible={false}
          />
        </PixelButton>
        <PixelButton
          variant="danger"
          accessibilityLabel={intl.formatMessage(messages.endGame)}
          disabled={!game}
          onPress={() => setDialog('endGame')}
        >
          <FontAwesome
            name="times"
            size={24}
            color="#ffffff"
            accessible={false}
          />
        </PixelButton>
      </HeaderRow>
      <Modal
        transparent
        visible={dialog !== null}
        animationType="fade"
        onRequestClose={() => setDialog(null)}
      >
        <ModalBackdrop>
          <DialogPanel accessibilityViewIsModal>
            <DialogTitle accessibilityRole="header">
              {intl.formatMessage(
                dialog === 'endGame' ? messages.endGame : messages.current,
              )}
            </DialogTitle>
            <ScrollView>
              {dialog === 'endGame' ? (
                <>
                  <DialogText>
                    {intl.formatMessage(messages.confirmEnd)}
                  </DialogText>
                  <PixelButton variant="danger" onPress={endGame}>
                    <DangerLabel>
                      {intl.formatMessage(messages.endGame)}
                    </DangerLabel>
                  </PixelButton>
                </>
              ) : (
                <GameScore players={game?.players ?? []} />
              )}
            </ScrollView>
            <CloseButton
              accessibilityLabel={intl.formatMessage(
                dialog === 'endGame' ? messages.cancel : messages.close,
              )}
              onPress={() => setDialog(null)}
            >
              <CloseLabel>
                {intl.formatMessage(
                  dialog === 'endGame' ? messages.cancel : messages.close,
                )}
              </CloseLabel>
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
const DangerLabel = styled(CloseLabel)({ color: '#ffffff' })
