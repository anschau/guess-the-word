import ScreenLayout from '../../components/ScreenLayout'
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static'
import { useIntl } from 'react-intl'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainStackParamList } from '../../navigation/MainStack'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import { usePlayersRepository } from '../../repositories/playersRepository'
import { useSettingsRepository } from '../../repositories/settingsRepository'
import { useGameTypeRepository } from '../../repositories/gameTypeRepository'
import { useGameRepository } from '../../repositories/gameRepository'
import { useWordRepository } from '../../repositories/wordRepository'
import { gameTypes } from '../../models/GameType'
import { theme } from '../../theme/theme'
import {
  Content,
  OptionContent,
  OptionDescription,
  OptionHeading,
  OptionTitle,
  Panel,
  ScreenScroll,
  StartLabel,
  Summary,
  Title,
} from './SelectGameTypeScreen.styles'
import messages from './messages'

type SelectGameTypeScreenProps = StackScreenProps<
  MainStackParamList,
  'SelectGameType'
>

export default function SelectGameTypeScreen({
  navigation,
}: SelectGameTypeScreenProps) {
  const intl = useIntl()
  const compact = useCompact()
  const players = usePlayersRepository(state => state.players)
  const rounds = useSettingsRepository(state => state.rounds)
  const selectedType = useGameTypeRepository(state => state.gameType)
  const setSelectedType = useGameTypeRepository(state => state.setGameType)
  const currentGame = useGameRepository(state => state.currentGame)
  const history = useGameRepository(state => state.history)
  const words = useWordRepository(state => state.words)
  const games = currentGame ? [...history, currentGame] : history

  function handleStart() {
    if (players.length < 2) {
      navigation.navigate('SelectPlayers')
      return
    }

    const startedAt = new Date().toISOString()
    useGameRepository.getState().saveGame({
      id: startedAt,
      startedAt,
      difficulty: selectedType.id,
      totalRounds: rounds,
      round: 1,
      currentPlayerIndex: 0,
      players: players.map((name, index) => ({
        id: String(index),
        name,
        score: 0,
      })),
      usedWordIds: [],
    })
    navigation.navigate('SwitchTurn', {
      playerName: players[0],
      round: 1,
      totalRounds: rounds,
    })
  }

  return (
    <ScreenLayout>
      <ScreenScroll>
        <Content>
          <Title $compact={compact} accessibilityRole="header">
            {intl.formatMessage(messages.title)}
          </Title>
          <Panel>
            {Object.values(gameTypes).map(gameType => {
              const selected = selectedType.id === gameType.id
              const title = intl.formatMessage(messages[gameType.id])
              const categoryWords = words.filter(
                word => word.gameTypeId === gameType.id,
              )
              const usedWordIds = new Set(
                games
                  .filter(game => game.difficulty === gameType.id)
                  .flatMap(game => game.usedWordIds),
              )
              const usedWords = categoryWords.filter(word =>
                usedWordIds.has(String(word.id)),
              ).length
              const wordCount = `${usedWords}/${categoryWords.length}`

              return (
                <PixelButton
                  key={gameType.id}
                  variant={selected ? 'primary' : 'secondary'}
                  accessibilityLabel={`${title}. ${wordCount}`}
                  accessibilityState={{ selected }}
                  onPress={() =>
                    setSelectedType({ id: gameType.id, title })
                  }
                >
                  <OptionContent>
                    <OptionHeading>
                      <OptionTitle $compact={compact}>{title}</OptionTitle>
                      {selected && (
                        <FontAwesome
                          name="check"
                          size={compact ? 26 : 32}
                          color={theme.colors.text}
                          accessible={false}
                        />
                      )}
                    </OptionHeading>
                    <OptionDescription $compact={compact}>
                      {wordCount}
                    </OptionDescription>
                  </OptionContent>
                </PixelButton>
              )
            })}
            <Summary $compact={compact}>
              {intl.formatMessage(messages.summary, {
                players: players.length,
                rounds,
                words: players.length * rounds,
              })}
            </Summary>
            <PixelButton
              variant="primary"
              accessibilityLabel={intl.formatMessage(messages.start)}
              onPress={handleStart}
            >
              <StartLabel $compact={compact}>
                {intl.formatMessage(messages.start)}
              </StartLabel>
            </PixelButton>
          </Panel>
        </Content>
      </ScreenScroll>
    </ScreenLayout>
  )
}
