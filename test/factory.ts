import { Factory } from 'fishery'
import faker from 'faker'
import { User } from 'types/common'

export const image = Factory.define<SpotifyApi.ImageObject>(() => ({
  height: faker.datatype.number(),
  url: faker.image.imageUrl(),
  width: faker.datatype.number(),
}))

export const user = Factory.define<User>(() => ({
  birthdate: faker.date.past().toISOString(),
  country: faker.address.country(),
  display_name: faker.name.firstName(),
  email: faker.internet.email(),
  external_urls: { spotify: faker.internet.url() },
  followers: { href: null, total: faker.datatype.number() },
  href: faker.internet.url(),
  id: faker.datatype.uuid(),
  images: [image.build()],
  product: faker.random.arrayElement(['premium', 'free']),
  type: 'user',
  uri: faker.internet.url(),
}))

type Page<T> = SpotifyApi.PagingObject<T>

export const page = <T>(params: Partial<Page<T>>): Page<T> => ({
  href: `${faker.internet.url()}?offset=0&limit=20`,
  items: [],
  limit: 20,
  next: null,
  offset: 0,
  previous: null,
  total: params.items?.length || 0,
  ...params,
})

const showLight = Factory.define<SpotifyApi.ShowObjectSimplified>(
  ({ sequence }) => ({
    available_markets: [],
    copyrights: [],
    description: faker.lorem.sentence(),
    explicit: faker.datatype.boolean(),
    external_urls: { spotify: faker.internet.url() },
    href: faker.internet.url(),
    id: sequence.toString(),
    images: image.buildList(3),
    is_externally_hosted: false,
    languages: ['en'],
    media_type: 'audio',
    name: faker.name.title(),
    publisher: faker.name.findName(),
    type: 'show',
    total_episodes: faker.datatype.number(),
    uri: `"spotify:show:${sequence}`,
  })
)

const episodeLight = Factory.define<SpotifyApi.EpisodeObjectSimplified>(
  ({ sequence }) => ({
    audio_preview_url: faker.internet.url(),
    description: faker.lorem.sentence(),
    duration_ms: faker.datatype.number(),
    explicit: faker.datatype.boolean(),
    external_urls: { spotify: faker.internet.url() },
    html_description: faker.lorem.sentence(),
    href: faker.internet.url(),
    id: sequence.toString(),
    images: image.buildList(3),
    is_externally_hosted: faker.datatype.boolean(),
    is_playable: faker.datatype.boolean(),
    language: 'en',
    languages: ['en'],
    name: faker.name.title(),
    release_date: faker.date.past().toISOString(),
    release_date_precision: 'day',
    type: 'episode',
    uri: `"spotify:episode:${sequence}`,
  })
)

const showFull = Factory.define<SpotifyApi.ShowObjectFull>(() => ({
  ...showLight.build(),
  episodes: page({ items: episodeLight.buildList(10) }),
  external_urls: { spotify: faker.internet.url() },
}))

const episodeFull = Factory.define<SpotifyApi.EpisodeObjectFull>(() => ({
  ...episodeLight.build(),
  show: showLight.build(),
}))

const showSaved = Factory.define<SpotifyApi.SavedShowObject>(() => ({
  added_at: faker.date.past().toISOString(),
  show: showLight.build(),
}))

const episodeSaved = Factory.define<SpotifyApi.SavedEpisodeObject>(() => ({
  added_at: faker.date.past().toISOString(),
  episode: episodeFull.build(),
}))

export const show = {
  light: showLight,
  full: showFull,
  saved: showSaved,
}

export const episode = {
  light: episodeLight,
  full: episodeFull,
  saved: episodeSaved,
}
