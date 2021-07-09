import { screen } from '@testing-library/react'
import { factory, mockSpotifyAPI, render } from 'test/utils'
import { ShowResults } from './ShowResults'

describe('<ShowResults />', () => {
  const query = 'foo bar'

  describe('when results are found', () => {
    const shows = factory.show.light.buildList(20)
    const results = { shows: factory.page({ items: shows }) }

    beforeEach(() => {
      mockSpotifyAPI().get(`/search?type=show&q=foo%20bar`).reply(200, results)
    })

    it('renders a spinner while fetching results', async () => {
      const { flushQueries } = render(<ShowResults query={query} />)
      screen.getByTestId(/spinner/i)
      await flushQueries()
      expect(screen.queryByTestId(/spinner/i)).toBeNull()
    })

    it('renders the show grid', async () => {
      const { flushQueries } = render(<ShowResults query={query} />)
      await flushQueries()
      shows.forEach((show) => screen.getByText(show.name))
    })
  })

  describe('when no results are found', () => {
    const emptyResults = { shows: factory.page({ items: [] }) }

    beforeEach(() => {
      mockSpotifyAPI()
        .get(`/search?type=show&q=foo%20bar`)
        .reply(200, emptyResults)
    })

    it('renders an empty state', async () => {
      const { flushQueries } = render(<ShowResults query={query} />)
      await flushQueries()
      screen.getByRole('heading', { name: /oh snap! no results found\./i })
      screen.getByAltText(/person looking into empty box\./i)
    })
  })
})
