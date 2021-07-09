import { screen } from '@testing-library/react'
import { factory, mockSpotifyAPI, render } from 'test/utils'
import { EpisodeResults } from './EpisodeResults'

describe('<EpisodeResults />', () => {
  const query = 'foo bar'

  describe('when results are found', () => {
    const episodes = factory.episode.light.buildList(20)
    const results = { episodes: factory.page({ items: episodes }) }

    beforeEach(() => {
      mockSpotifyAPI()
        .get(`/search?type=episode&q=foo%20bar`)
        .reply(200, results)
    })

    it('renders a spinner while fetching results', async () => {
      const { flushQueries } = render(<EpisodeResults query={query} />)
      screen.getByTestId(/spinner/i)
      await flushQueries()
      expect(screen.queryByTestId(/spinner/i)).toBeNull()
    })

    it('renders the episode list', async () => {
      const { flushQueries } = render(<EpisodeResults query={query} />)
      await flushQueries()
      episodes.forEach((episode) => screen.getByText(episode.name))
    })
  })

  describe('when no results are found', () => {
    const emptyResults = { episodes: factory.page({ items: [] }) }

    beforeEach(() => {
      mockSpotifyAPI()
        .get(`/search?type=episode&q=foo%20bar`)
        .reply(200, emptyResults)
    })

    it('renders an empty state', async () => {
      const { flushQueries } = render(<EpisodeResults query={query} />)
      await flushQueries()
      screen.getByRole('heading', { name: /oh snap! no results found\./i })
      screen.getByAltText(/person looking into empty box\./i)
    })
  })
})
