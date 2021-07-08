import { screen } from '@testing-library/react'
import { factory, mockSpotifyAPI, render } from 'test/utils'
import { SavedShows } from './SavedShows'

describe('<SavedShows />', () => {
  describe('when there are saved shows', () => {
    const shows = factory.show.saved.buildList(15)

    beforeEach(() => {
      mockSpotifyAPI()
        .get('/me/shows')
        .reply(200, factory.page({ items: shows }))
    })

    it('renders the show grid', async () => {
      const { flushQueries } = render(<SavedShows />)
      await flushQueries()
      shows.forEach((item) => screen.getByText(item.show.name))
    })
  })

  describe('when saved list is empty', () => {
    beforeEach(() => {
      mockSpotifyAPI()
        .get('/me/shows')
        .reply(200, factory.page({ items: [] }))
    })

    it('renders the empty state', async () => {
      const { flushQueries } = render(<SavedShows />)
      await flushQueries()
      screen.getByRole('heading', { name: /oh snap! nothing to see here\./i })
    })
  })
})
