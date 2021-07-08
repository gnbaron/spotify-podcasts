import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { factory, mockSpotifyAPI, render as utilsRender } from 'test/utils'
import { ShowDetails } from './ShowDetails'

describe('<ShowDetails />', () => {
  const show = factory.show.full.build()
  const episodes = factory.episode.light.buildList(20)

  function render(ui: React.ReactElement) {
    return utilsRender(ui, {
      pathname: `/shows/${show.id}`,
      route: `/shows/:showId`,
    })
  }

  beforeEach(() => {
    mockSpotifyAPI()
      // reply to show query
      .get(`/shows/${show.id}`)
      .reply(200, show)
      // reply to episodes query
      .get(`/shows/${show.id}/episodes`)
      .reply(200, factory.page({ items: episodes }))
      // reply to follow status query
      .get(`/me/shows/contains?ids=${show.id}`)
      .reply(200, [false])
  })

  it('renders show cover', async () => {
    const { flushQueries } = render(<ShowDetails />)
    await flushQueries()
    const cover = show.images[1] || show.images[0]
    expect(screen.getByRole('img')).toHaveAttribute('src', cover.url)
  })

  it('renders show title, publisher and description', async () => {
    const { flushQueries } = render(<ShowDetails />)
    await flushQueries()
    screen.getByRole('heading', { name: show.name })
    screen.getByRole('heading', { name: show.publisher })
    screen.getByText(show.description)
  })

  it('renders the episode list', async () => {
    const { flushQueries } = render(<ShowDetails />)
    await flushQueries()
    episodes.forEach((episode) => screen.getByText(episode.name))
  })

  it('follows/unfollows the show', async () => {
    const { flushQueries } = render(<ShowDetails />)
    await flushQueries()

    // follow
    mockSpotifyAPI()
      // reply to follow mutation
      .put(`/me/shows`, { ids: [show.id] })
      .reply(200)
      // reply to follow status query
      .get(`/me/shows/contains?ids=${show.id}`)
      .reply(200, [true])

    const followButton = screen.getByRole('button', { name: /follow/i })
    userEvent.click(followButton)
    await flushQueries()

    // unfollow
    mockSpotifyAPI()
      // reply to unfollow mutation
      .delete(`/me/shows`, { ids: [show.id] })
      .reply(200)
      // reply to follow status query
      .get(`/me/shows/contains?ids=${show.id}`)
      .reply(200, [false])

    const unfollowButton = screen.getByRole('button', { name: /unfollow/i })
    userEvent.click(unfollowButton)
    await flushQueries()

    screen.getByRole('button', { name: /follow/i })
  })
})
