import { screen } from '@testing-library/react'
import { factory, render } from 'test/utils'
import { EpisodeList } from './EpisodeList'

describe('<EpisodeList />', () => {
  it('renders the list of episodes', () => {
    render(<EpisodeList episodes={factory.episode.light.buildList(10)} />)
    expect(screen.getAllByRole('article')).toHaveLength(10)
  })
})
