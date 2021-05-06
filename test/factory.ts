import { Factory } from 'fishery'
import faker from 'faker'

export const image = Factory.define<SpotifyApi.ImageObject>(() => ({
  height: faker.datatype.number(),
  url: faker.internet.url(),
  width: faker.datatype.number(),
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
