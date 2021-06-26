import { useInfiniteQuery, UseInfiniteQueryResult, useQuery } from 'react-query'
import { usePaginatedQuery } from './query-utils'
import { BASE_URL, fetchSpotifyAPI } from './spotify-api'

export const queryKeys = {
  episode: (episodeId: string) => ['episode', episodeId],
  episodes: (showId: string) => ['episodes', showId],
  savedEpisodes: (...ids: string[]) => ['savedEpisodes', ...ids],
  savedShows: (...ids: string[]) => ['savedShows', ...ids],
  search: (query: string, type: 'show' | 'episode') => ['search', query, type],
  show: (showId: string) => ['show', showId],
}

export function useShow(showId: string) {
  return useQuery<SpotifyApi.ShowObject>(
    queryKeys.show(showId),
    () => fetchSpotifyAPI(`${BASE_URL}/shows/${showId}`),
    {}
  )
}

export function useShowEpisodes(showId: string) {
  return usePaginatedQuery<SpotifyApi.EpisodeObjectSimplified>(
    queryKeys.episodes(showId),
    (nextPageURL) =>
      fetchSpotifyAPI(nextPageURL || `${BASE_URL}/shows/${showId}/episodes`)
  )
}

export function useEpisode(episodeId: string) {
  return useQuery<SpotifyApi.EpisodeObject>(
    queryKeys.episode(episodeId),
    () => fetchSpotifyAPI(`${BASE_URL}/episodes/${episodeId}`),
    {}
  )
}

export function useSavedShows() {
  return usePaginatedQuery<SpotifyApi.SavedShowObject>(
    queryKeys.savedShows(),
    (nextPageURL) => fetchSpotifyAPI(nextPageURL || `${BASE_URL}/me/shows`)
  )
}

export function useSavedEpisodes() {
  return usePaginatedQuery<SpotifyApi.SavedEpisodeObject>(
    queryKeys.savedEpisodes(),
    (nextPageURL) => fetchSpotifyAPI(nextPageURL || `${BASE_URL}/me/episodes`)
  )
}

export function useEpisodeIsSaved(...episodeIds: string[]) {
  return useQuery<boolean[]>(
    queryKeys.savedEpisodes(...episodeIds),
    () =>
      fetchSpotifyAPI(
        `${BASE_URL}/me/episodes/contains?ids=${episodeIds.join(',')}`
      ),
    { suspense: false }
  )
}

export function useShowIsSaved(...showIds: string[]) {
  return useQuery<boolean[]>(
    queryKeys.savedShows(...showIds),
    () =>
      fetchSpotifyAPI(`${BASE_URL}/me/shows/contains?ids=${showIds.join(',')}`),
    { suspense: false }
  )
}

type Episodes = {
  episodes: SpotifyApi.PagingObject<SpotifyApi.EpisodeObjectSimplified>
}
type Shows = {
  shows: SpotifyApi.PagingObject<SpotifyApi.ShowObjectSimplified>
}
type Result<T> = UseInfiniteQueryResult<T>

export function useSearch(query: string, type: 'episode'): Result<Episodes>
export function useSearch(query: string, type: 'show'): Result<Shows>
export function useSearch(query: string, type: 'show' | 'episode') {
  return useInfiniteQuery<Episodes | Shows>(
    queryKeys.search(query, type),
    ({ pageParam }) =>
      fetchSpotifyAPI(
        pageParam ||
          `${BASE_URL}/search?type=${type}&q=${encodeURIComponent(query)}`
      ),
    {
      enabled: query.length > 0,
      getPreviousPageParam: (firstPage) =>
        'episodes' in firstPage
          ? firstPage.episodes.href
          : firstPage.shows.href,
      getNextPageParam: (lastPage) =>
        'episodes' in lastPage ? lastPage.episodes.next : lastPage.shows.next,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 0,
      suspense: false,
    }
  )
}
