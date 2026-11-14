import { useIntl } from 'react-intl'
import { useCompact } from '../config/config'
import type { SavedGame } from '../repositories/gameRepository'
import {
  PlayerScore,
  Position,
  Ranking,
  RankingTitle,
  ScoreRow,
} from './GameScore.styles'
import messages from './GameScore.messages'

type Props = {
  players: SavedGame['players']
  title?: string
}

export default function GameScore({ players, title }: Props) {
  const intl = useIntl()
  const compact = useCompact()
  const rankedPlayers = [...players].sort((a, b) => b.score - a.score)

  return (
    <Ranking>
      {title && (
        <RankingTitle $compact={compact} accessibilityRole="header">
          {title}
        </RankingTitle>
      )}
      {rankedPlayers.map(player => (
        <ScoreRow key={player.id}>
          <Position>
            {rankedPlayers.findIndex(item => item.score === player.score) + 1}º
          </Position>
          <PlayerScore $compact={compact}>
            {`${player.name} — ${
              player.score === 1
                ? intl.formatMessage(messages.onePoint)
                : intl.formatMessage(messages.points, { points: player.score })
            }`}
          </PlayerScore>
        </ScoreRow>
      ))}
      {!rankedPlayers.length && (
        <PlayerScore $compact={compact}>
          {intl.formatMessage(messages.empty)}
        </PlayerScore>
      )}
    </Ranking>
  )
}
