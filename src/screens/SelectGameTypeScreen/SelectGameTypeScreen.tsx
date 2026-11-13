import { useState } from 'react'
import { FontAwesome } from '@react-native-vector-icons/fontawesome/static'
import { useIntl } from 'react-intl'
import { Alert, StatusBar } from 'react-native'
import PixelButton from '../../components/PixelButton'
import { useCompact } from '../../config/config'
import { usePlayersRepository } from '../../repositories/playersRepository'
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

const gameTypes = [
  {
    value: 'easy',
    title: messages.easy,
    description: messages.easyDescription,
  },
  {
    value: 'medium',
    title: messages.medium,
    description: messages.mediumDescription,
  },
  {
    value: 'hard',
    title: messages.hard,
    description: messages.hardDescription,
  },
] as const

type GameType = (typeof gameTypes)[number]['value']

const rounds = 3

export default function SelectGameTypeScreen() {
  const intl = useIntl()
  const compact = useCompact()
  const players = usePlayersRepository(state => state.players)
  const [selectedType, setSelectedType] = useState<GameType>('easy')

  function handleStart() {
    Alert.alert(
      intl.formatMessage(messages.comingSoonTitle),
      intl.formatMessage(messages.comingSoonText),
    )
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
              {gameTypes.map(gameType => {
                const selected = selectedType === gameType.value
                const title = intl.formatMessage(gameType.title)
                const description = intl.formatMessage(gameType.description)

                return (
                  <PixelButton
                    key={gameType.value}
                    variant={selected ? 'primary' : 'secondary'}
                    accessibilityLabel={`${title}. ${description}`}
                    accessibilityState={{ selected }}
                    onPress={() => setSelectedType(gameType.value)}
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
