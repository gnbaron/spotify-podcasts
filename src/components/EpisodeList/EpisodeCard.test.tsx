import { screen } from '@testing-library/react'
import { factory, mockScreenSize, render } from 'test/utils'
import { EpisodeCard } from './EpisodeCard'

describe('<EpisodeCard />', () => {
  it('renders the episode cover image', () => {
    const episode = factory.episode.light.build()
    render(<EpisodeCard episode={episode} />)
    const cover = screen.getByRole('img', { hidden: true })
    expect(cover.closest('a')).toHaveAttribute(
      'href',
      `/episodes/${episode.id}`
    )
  })

  it('renders episode title', () => {
    const episode = factory.episode.light.build()
    render(<EpisodeCard episode={episode} />)
    screen.getByText(episode.name)
  })

  describe('when screen size is wide', () => {
    beforeEach(() => mockScreenSize('wide'))

    it('renders episode description', () => {
      const episode = factory.episode.light.build({
        description: 'This was a fun episode!',
      })
      render(<EpisodeCard episode={episode} />)
      screen.getByText(episode.description)
    })
  })
})
