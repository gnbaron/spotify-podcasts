import { screen } from '@testing-library/react'
import { mockScreenSize, render } from 'test/utils'
import * as factory from 'test/factory'
import { EpisodeCard } from './EpisodeCard'

describe('<EpisodeCard />', () => {
  it('renders the episode cover image', () => {
    const episode = factory.episode.build()
    render(<EpisodeCard episode={episode} />)
    const cover = screen.getByRole('img', { hidden: true })
    expect(cover.closest('a')).toHaveAttribute(
      'href',
      `/episodes/${episode.id}`
    )
  })

  it('renders episode title', () => {
    const episode = factory.episode.build()
    render(<EpisodeCard episode={episode} />)
    screen.getByText(episode.name)
  })

  describe('when screen size is wide', () => {
    beforeAll(() => mockScreenSize('wide'))

    it('renders episode description', () => {
      const episode = factory.episode.build({
        description: 'This was a fun episode!',
      })
      render(<EpisodeCard episode={episode} />)
      screen.getByText(episode.description)
    })
  })
})