import { screen } from '@testing-library/react'
import { factory, mockSpotifyAPI, render } from 'test/utils'
import { SavedEpisodes } from './SavedEpisodes'

describe('<SavedEpisodes />', () => {
  describe('when there are saved episodes', () => {
    const savedEpisodes = factory.episode.saved.buildList(15)

    beforeEach(() => {
      mockSpotifyAPI()
        .get('/me/episodes')
        .reply(200, factory.page({ items: savedEpisodes }))
    })

    it('renders the episode list', async () => {
      const { flushQueries } = render(<SavedEpisodes />)
      await flushQueries()
      savedEpisodes.forEach((item) => screen.getByText(item.episode.name))
    })
  })

  describe('when saved list is empty', () => {
    beforeEach(() => {
      mockSpotifyAPI()
        .get('/me/episodes')
        .reply(200, factory.page({ items: [] }))
    })

    it('renders the empty state', async () => {
      const { flushQueries } = render(<SavedEpisodes />)
      await flushQueries()
      screen.getByRole('heading', { name: /oh snap! nothing to see here\./i })
    })
  })
})
