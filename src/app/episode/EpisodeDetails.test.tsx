import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { factory, mockSpotifyAPI, render as utilsRender } from 'test/utils'
import { EpisodeDetails } from './EpisodeDetails'

describe('<EpisodeDetails />', () => {
  const episode = factory.episode.full.build()

  function render(ui: React.ReactElement) {
    return utilsRender(ui, {
      pathname: `/episodes/${episode.id}`,
      route: `/episodes/:episodeId`,
    })
  }

  beforeEach(() => {
    mockSpotifyAPI()
      // reply to episode query
      .get(`/episodes/${episode.id}`)
      .reply(200, episode)
      // reply to user's library query
      .get(`/me/episodes/contains?ids=${episode.id}`)
      .reply(200, [false])
  })

  it('renders episode cover', async () => {
    const { flushQueries } = render(<EpisodeDetails />)
    await flushQueries()
    const cover = episode.images[1] || episode.images[0]
    expect(screen.getByRole('img')).toHaveAttribute('src', cover.url)
  })

  it('renders episode heading and description', async () => {
    const { flushQueries } = render(<EpisodeDetails />)
    await flushQueries()

    screen.getByRole('heading', { name: episode.name })

    const subtitle = screen.getByRole('heading', { name: episode.show.name })
    expect(subtitle.closest('a')).toHaveAttribute(
      'href',
      `/shows/${episode.show.id}`
    )

    screen.getByText(episode.html_description)
  })

  it("saves/removes episode to/from user's library", async () => {
    const { flushQueries } = render(<EpisodeDetails />)
    await flushQueries()

    // save
    mockSpotifyAPI()
      // reply to save mutation
      .put(`/me/episodes`, { ids: [episode.id] })
      .reply(200)
      // reply to user's library query
      .get(`/me/episodes/contains?ids=${episode.id}`)
      .reply(200, [true])

    const saveButton = screen.getByRole('button', {
      name: /save to library/i,
    })
    userEvent.click(saveButton)
    await flushQueries()

    // remove
    mockSpotifyAPI()
      // reply to remove mutation
      .delete(`/me/episodes`, { ids: [episode.id] })
      .reply(200)
      // reply to user's library query
      .get(`/me/episodes/contains?ids=${episode.id}`)
      .reply(200, [false])

    const removeButton = screen.getByRole('button', {
      name: /remove from library/i,
    })
    userEvent.click(removeButton)
    await flushQueries()

    screen.getByRole('button', { name: /save to library/i })
  })
})
