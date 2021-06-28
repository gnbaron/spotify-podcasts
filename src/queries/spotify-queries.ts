import { useInfiniteQuery, useQuery } from 'react-query'
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

const searchOptions = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  retry: false,
  staleTime: 0,
  suspense: false,
}

export function useSearchShows(query: string) {
  const queryResult = useInfiniteQuery<{
    shows: SpotifyApi.PagingObject<SpotifyApi.ShowObjectSimplified>
  }>(
    queryKeys.search(query, 'show'),
    ({ pageParam }) =>
      fetchSpotifyAPI(
        pageParam ||
          `${BASE_URL}/search?type=show&q=${encodeURIComponent(query)}`
      ),
    {
      enabled: query.length > 0,
      getPreviousPageParam: (firstPage) => firstPage.shows.href,
      getNextPageParam: (lastPage) => lastPage.shows.next,
      ...searchOptions,
    }
  )

  const data = queryResult.data?.pages
    .reduce<SpotifyApi.ShowObjectSimplified[]>(
      (items, page) => [...items, ...page.shows.items],
      []
    )
    .filter(Boolean)

  const totalElements = queryResult.data
    ? queryResult.data.pages[0].shows.total
    : 0

  return { ...queryResult, data, totalElements }
}

export function useSearchEpisodes(query: string) {
  const queryResult = useInfiniteQuery<{
    episodes: SpotifyApi.PagingObject<SpotifyApi.EpisodeObjectSimplified>
  }>(
    queryKeys.search(query, 'episode'),
    ({ pageParam }) =>
      fetchSpotifyAPI(
        pageParam ||
          `${BASE_URL}/search?type=episode&q=${encodeURIComponent(query)}`
      ),
    {
      enabled: query.length > 0,
      getPreviousPageParam: (firstPage) => firstPage.episodes.href,
      getNextPageParam: (lastPage) => lastPage.episodes.next,
      ...searchOptions,
    }
  )

  const data = queryResult.data?.pages
    .reduce<SpotifyApi.EpisodeObjectSimplified[]>(
      (items, page) => [...items, ...page.episodes.items],
      []
    )
    .filter(Boolean)

  const totalElements = queryResult.data
    ? queryResult.data.pages[0].episodes.total
    : 0

  return { ...queryResult, data, totalElements }
}
