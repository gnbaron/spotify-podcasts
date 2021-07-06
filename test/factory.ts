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

export const show = Factory.define<SpotifyApi.ShowObjectSimplified>(
  ({ sequence }) => ({
    available_markets: [],
    copyrights: [],
    description: faker.lorem.lines(4),
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

export const episode = Factory.define<SpotifyApi.EpisodeObjectSimplified>(
  ({ sequence }) => ({
    audio_preview_url: faker.internet.url(),
    description: faker.lorem.lines(4),
    duration_ms: faker.datatype.number(),
    explicit: faker.datatype.boolean(),
    external_urls: { spotify: faker.internet.url() },
    html_description: faker.lorem.lines(4),
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
