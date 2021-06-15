import { useInfiniteQuery, useQuery, UseQueryOptions } from 'react-query'
import { usePaginatedQuery } from './query-utils'
import { BASE_URL, fetchSpotifyAPI } from './spotify-api'

export const queryKeys = {
  episode: (episodeId: string) => ['episode', episodeId],
  episodes: (showId: string) => ['episodes', showId],
  profile: () => ['profile'],
  savedEpisodes: (...ids: string[]) => ['savedEpisodes', ...ids],
  savedShows: () => ['savedShows'],
  search: (query: string) => ['search', query],
  searchEpisodes: (queryRef: string) => ['searchEpisodes', queryRef],
  searchShows: (queryRef: string) => ['searchShows', queryRef],
  show: (showId: string) => ['show', showId],
}

export function useProfile(
  options: UseQueryOptions<SpotifyApi.UserObjectPrivate> = {}
) {
  return useQuery<SpotifyApi.UserObjectPrivate>(
    queryKeys.profile(),
    () => fetchSpotifyAPI(`${BASE_URL}/me`),
    options
  )
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
    {}
  )
}

type Paginated<T> = SpotifyApi.PagingObject<T>
type PaginatedEpisodes = Paginated<SpotifyApi.EpisodeObjectSimplified>
type PaginatedShows = Paginated<SpotifyApi.ShowObjectSimplified>

type SearchResults = {
  episodes: Paginated<SpotifyApi.EpisodeObjectSimplified>
  shows: Paginated<SpotifyApi.ShowObjectSimplified>
}

const searchQueryOptions = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  retry: false,
  staleTime: 0,
  suspense: false,
}

export function useSearch(query: string, options: { enabled?: boolean } = {}) {
  return useQuery<SearchResults>(
    queryKeys.search(query),
    () =>
      fetchSpotifyAPI(
        `${BASE_URL}/search?type=show,episode&q=${encodeURIComponent(query)}`
      ),
    { ...searchQueryOptions, ...options }
  )
}

export function useSearchShows(initialData: PaginatedShows) {
  return useInfiniteQuery<{ shows: PaginatedShows }>(
    queryKeys.searchShows(initialData.href),
    ({ pageParam }) => fetchSpotifyAPI(pageParam),
    {
      ...searchQueryOptions,
      getPreviousPageParam: (firstPage) => firstPage.shows.href,
      getNextPageParam: (lastPage) => lastPage.shows.next ?? undefined,
      initialData: {
        pageParams: [],
        pages: [{ shows: initialData }],
      },
    }
  )
}

export function useSearchEpisodes(initialData: PaginatedEpisodes) {
  return useInfiniteQuery<{ episodes: PaginatedEpisodes }>(
    queryKeys.searchEpisodes(initialData.href),
    ({ pageParam }) => fetchSpotifyAPI(pageParam),
    {
      ...searchQueryOptions,
      getPreviousPageParam: (firstPage) => firstPage.episodes.href,
      getNextPageParam: (lastPage) => lastPage.episodes.next ?? undefined,
      initialData: {
        pageParams: [],
        pages: [{ episodes: initialData }],
      },
    }
  )
}
