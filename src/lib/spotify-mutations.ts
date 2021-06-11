import { useMutation } from 'react-query'
import { queryKeys } from './spotify-queries'
import { queryClient } from './query-client'
import { BASE_URL, fetchSpotifyAPI } from './spotify-api'

export function useMutateSavedEpisodes({
  removing,
}: { removing?: boolean } = {}) {
  return useMutation(
    (...ids: string[]) =>
      fetchSpotifyAPI(`${BASE_URL}/me/episodes`, {
        body: JSON.stringify({ ids }),
        method: removing ? 'DELETE' : 'PUT',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKeys.savedEpisodes()),
    }
  )
}
