import { useGameRepository } from '../repositories/gameRepository'
import { usePlayersRepository } from '../repositories/playersRepository'
import { usePreferencesRepository } from '../repositories/preferencesRepository'

const repositories = [
  usePlayersRepository,
  usePreferencesRepository,
  useGameRepository,
]

export async function hydrateRepositories() {
  await Promise.all(
    repositories.map(repository => repository.persist.rehydrate()),
  )
  // Zustand reports failed reads via hasHydrated rather than rejecting rehydrate.
  if (repositories.some(repository => !repository.persist.hasHydrated())) {
    throw new Error('Could not restore local game data')
  }
}
