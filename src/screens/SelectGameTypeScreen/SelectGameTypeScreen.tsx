import { FontAwesome } from '@react-native-vector-icons/fontawesome/static'
import { useIntl } from 'react-intl'
import { StatusBar } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainStackParamList } from '../../navigation/MainStack'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import { usePlayersRepository } from '../../repositories/playersRepository'
import { useGameTypeRepository } from '../../repositories/gameTypeRepository'
import { gameTypes } from '../../models/GameType'
import { theme } from '../../theme/theme'
import {
  BackgroundContainer,
  BackgroundImage,
  PaperBottom,
  PaperTop,
  Rivet,
  SafeArea,
} from '../MainScreen/MainScreen.styles'
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

const rounds = 3

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
  const selectedType = useGameTypeRepository(state => state.gameType)
  const setSelectedType = useGameTypeRepository(state => state.setGameType)

  function handleStart() {
    if (players.length < 2) {
      navigation.navigate('SelectPlayers')
      return
    }

    navigation.navigate('SwitchTurn', {
      playerName: players[0],
      round: 1,
      totalRounds: rounds,
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
            <Title $compact={compact} accessibilityRole="header">
              {intl.formatMessage(messages.title)}
            </Title>
            <Panel>
              <PaperTop />
              <PaperBottom />
              <Rivet $side="left" />
              <Rivet $side="right" />
              {Object.values(gameTypes).map(gameType => {
                const selected = selectedType.id === gameType.id
                const title = intl.formatMessage(messages[gameType.id])
                const description = intl.formatMessage(
                  messages[`${gameType.id}Description`],
                )

                return (
                  <PixelButton
                    key={gameType.id}
                    variant={selected ? 'primary' : 'secondary'}
                    accessibilityLabel={`${title}. ${description}`}
                    accessibilityState={{ selected }}
                    onPress={() =>
                      setSelectedType({ id: gameType.id, title, description })
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
                        {description}
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
      </SafeArea>
    </>
  )
}
