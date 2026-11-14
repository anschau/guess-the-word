import { useRef, useState } from 'react'
import type { StackScreenProps } from '@react-navigation/stack'
import { useIntl } from 'react-intl'
import { Modal, ScrollView, StatusBar } from 'react-native'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import type { MainStackParamList } from '../../navigation/MainStack'
import { useGameRepository } from '../../repositories/gameRepository'
import { useGameTypeRepository } from '../../repositories/gameTypeRepository'
import { useWordRepository } from '../../repositories/wordRepository'
import {
  BackgroundContainer,
  BackgroundImage,
  SafeArea,
  PaperTop,
  PaperBottom,
  Rivet,
  ModalBackdrop,
  DialogPanel,
  DialogTitle,
} from '../MainScreen/MainScreen.styles'
import {
  Actions,
  Body,
  ButtonLabel,
  ClueLabel,
  ClueText,
  ClueTitle,
  Content,
  Divider,
  Footer,
  Header,
  Highlight,
  Legend,
  Panel,
  ScreenScroll,
  SecondaryLabel,
  SecretWord,
  Section,
} from './GuessTheWordScreen.styles'
import messages from './messages'

type Props = StackScreenProps<MainStackParamList, 'GuessTheWord'>

export default function GuessTheWordScreen({ route, navigation }: Props) {
  const intl = useIntl()
  const compact = useCompact()
  const { playerName, round, totalRounds } = route.params
  const game = useGameRepository(state => state.currentGame)
  const [clueIndex, setClueIndex] = useState(0)
  const [choosingWinner, setChoosingWinner] = useState(false)
  const completed = useRef(false)
  const [word] = useState(() => {
    const difficulty =
      game?.difficulty ?? useGameTypeRepository.getState().gameType.id
    const words = useWordRepository.getState().getWordsByGameType(difficulty)
    const unused = words.filter(
      item => !game?.usedWordIds.includes(String(item.id)),
    )
    const available = unused.length ? unused : words
    return available[Math.floor(Math.random() * available.length)]
  })
  const clues = word
    ? [
        {
          title: word.clue1Title,
          text: word.clue1Text,
          translation: word.clue1Translation,
        },
        {
          title: word.clue2Title,
          text: word.clue2Text,
          translation: word.clue2Translation,
        },
        {
          title: word.clue3Title,
          text: word.clue3Text,
          translation: word.clue3Translation,
        },
      ]
    : []
  const clue = clues[clueIndex]
  const points = 3 - clueIndex
  console.log('clueIndex', clueIndex)
  console.log('points', points)
  function goHome() {
    navigation.popToTop()
  }

  function finishTurn(winnerId?: string) {
    if (completed.current) return
    completed.current = true
    setChoosingWinner(false)
    if (!game || !word) {
      goHome()
      return
    }
    const players = game.players.map(player => ({
      ...player,
      score: player.score + (player.id === winnerId ? points : 0),
    }))
    const nextIndex = (game.currentPlayerIndex + 1) % players.length
    const nextRound = game.round + (nextIndex === 0 ? 1 : 0)
    const updated = {
      ...game,
      players,
      usedWordIds: [...new Set([...game.usedWordIds, String(word.id)])],
    }
    const repository = useGameRepository.getState()
    if (nextRound > game.totalRounds) {
      repository.saveGame(updated)
      repository.finishGame()
      navigation.replace('FinalScore', { gameId: game.id })
      return
    }
    repository.saveGame({
      ...updated,
      currentPlayerIndex: nextIndex,
      round: nextRound,
    })
    navigation.replace('SwitchTurn', {
      playerName: players[nextIndex].name,
      round: nextRound,
      totalRounds: game.totalRounds,
    })
  }

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
            <Header $compact={compact} accessibilityRole="header">
              {intl.formatMessage(messages.roundLabel)}{' '}
              <Highlight>
                {intl.formatMessage(messages.round, { round, totalRounds })}
              </Highlight>
              {' · '}
              {intl.formatMessage(messages.turn)}{' '}
              <Highlight>{playerName}</Highlight>
            </Header>
            <Panel>
              <PaperTop />
              <PaperBottom />
              <Rivet $side="left" />
              <Rivet $side="right" />
              {word && clue ? (
                <>
                  <Section>
                    <Body $compact={compact}>
                      {intl.formatMessage(messages.secret)}
                    </Body>
                    <SecretWord $compact={compact}>{word.wordName}</SecretWord>
                    <Legend $compact={compact}>
                      {intl.formatMessage(messages.instructions)}
                    </Legend>
                  </Section>
                  <Divider />
                  <Section accessibilityLiveRegion="polite">
                    <ClueLabel $compact={compact}>
                      {intl.formatMessage(messages.clue, {
                        clue: clueIndex + 1,
                      })}
                    </ClueLabel>
                    <ClueTitle $compact={compact}>“{clue.title}”</ClueTitle>
                    <ClueText $compact={compact}>{clue.text}</ClueText>
                    <Body $compact={compact}>{clue.translation}</Body>
                  </Section>
                  <Divider />
                  <Body $compact={compact}>
                    {points === 1
                      ? intl.formatMessage(messages.onePoint)
                      : intl.formatMessage(messages.points, { points })}
                  </Body>
                  <Actions>
                    <PixelButton
                      variant="primary"
                      onPress={() => setChoosingWinner(true)}
                    >
                      <ButtonLabel $compact={compact}>
                        {intl.formatMessage(messages.correct)}
                      </ButtonLabel>
                    </PixelButton>
                    <PixelButton
                      onPress={() =>
                        clueIndex < 2
                          ? setClueIndex(clueIndex + 1)
                          : finishTurn()
                      }
                    >
                      <SecondaryLabel $compact={compact}>
                        {intl.formatMessage(
                          clueIndex < 2 ? messages.nextClue : messages.endTurn,
                        )}
                      </SecondaryLabel>
                    </PixelButton>
                  </Actions>
                </>
              ) : (
                <>
                  <Body $compact={compact}>
                    {intl.formatMessage(messages.empty)}
                  </Body>
                  <PixelButton onPress={goHome}>
                    <ButtonLabel $compact={compact}>
                      {intl.formatMessage(messages.home)}
                    </ButtonLabel>
                  </PixelButton>
                </>
              )}
            </Panel>
            <Footer $compact={compact}>
              {clueIndex < 2
                ? intl.formatMessage(messages.footer)
                : intl.formatMessage(messages.footerEnd)}
            </Footer>
          </Content>
        </ScreenScroll>
      </SafeArea>
      <Modal
        transparent
        visible={choosingWinner}
        animationType="fade"
        onRequestClose={() => setChoosingWinner(false)}
      >
        <ModalBackdrop>
          <DialogPanel accessibilityViewIsModal>
            <DialogTitle>{intl.formatMessage(messages.winner)}</DialogTitle>
            <ScrollView>
              <Actions>
                {game?.players
                  .filter((_, index) => index !== game.currentPlayerIndex)
                  .map(player => (
                    <PixelButton
                      key={player.id}
                      variant="primary"
                      onPress={() => finishTurn(player.id)}
                    >
                      <ButtonLabel $compact={compact}>
                        {player.name}
                      </ButtonLabel>
                    </PixelButton>
                  ))}
                <PixelButton onPress={() => setChoosingWinner(false)}>
                  <SecondaryLabel $compact={compact}>
                    {intl.formatMessage(messages.cancel)}
                  </SecondaryLabel>
                </PixelButton>
              </Actions>
            </ScrollView>
          </DialogPanel>
        </ModalBackdrop>
      </Modal>
    </>
  )
}
