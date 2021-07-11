import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { factory, Location, mockSpotifyAPI, render } from 'test/utils'
import { Search } from './Search'

describe('<Search />', () => {
  const query = 'foo bar'
  const shows = factory.show.light.buildList(15)
  const episodes = factory.episode.light.buildList(12)

  beforeEach(() => {
    mockSpotifyAPI()
      .get(`/search?type=show&q=foo%20bar`)
      .reply(200, { shows: factory.page({ items: shows }) })
      .get(`/search?type=episode&q=foo%20bar`)
      .reply(200, { episodes: factory.page({ items: episodes }) })
  })

  it('renders the header', () => {
    render(<Search />)
    screen.getByRole('heading', { name: /search for shows and episodes/i })
    expect(screen.getByRole('banner')).not.toHaveClass('active')
  })

  it('renders the search bar', () => {
    render(<Search />)
    screen.getByPlaceholderText(/shows and episodes/i)
  })

  it('hides the tab navigation', () => {
    render(<Search />)
    expect(screen.queryByRole('navigation')).toBeNull()
  })

  it('parses search params and trigger search', async () => {
    render(<Search />, { pathname: '/search?query=foo%20bar&type=episode' })
    await waitForElementToBeRemoved(() => screen.getByTestId('spinner'))
    episodes.forEach((episode) => screen.getByText(episode.name))
  })

  describe('when user types to search', () => {
    it('moves header up', async () => {
      render(<Search />)
      userEvent.type(screen.getByPlaceholderText(/shows and episodes/i), query)
      const banner = screen.getByRole('banner')
      await waitFor(() => expect(banner).toHaveClass('active'))
    })

    it('renders search results', async () => {
      render(<Search />)
      userEvent.type(screen.getByPlaceholderText(/shows and episodes/i), query)

      await waitFor(() => screen.getByRole('navigation'))
      await waitForElementToBeRemoved(() => screen.getByTestId('spinner'))

      // render shows
      shows.forEach((show) => screen.getByText(show.name))
      episodes.forEach((episode) =>
        expect(screen.queryByText(episode.name)).toBeNull()
      )

      // render episodes
      userEvent.click(screen.getByRole('tab', { name: /episodes/i }))
      await waitForElementToBeRemoved(() => screen.getByTestId('spinner'))
      episodes.forEach((episode) => screen.getByText(episode.name))
      shows.forEach((show) => expect(screen.queryByText(show.name)).toBeNull())
    })

    it('updates url search params', async () => {
      render(
        <>
          <Search />
          <Location />
        </>
      )
      userEvent.type(screen.getByPlaceholderText(/shows and episodes/i), query)
      await waitFor(() => screen.getByText('/search?query=foo%20bar&type=show'))
      userEvent.click(screen.getByRole('tab', { name: /episodes/i }))
      await waitFor(() =>
        screen.getByText('/search?query=foo%20bar&type=episode')
      )
    })
  })
})
