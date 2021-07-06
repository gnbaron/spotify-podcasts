import { screen } from '@testing-library/react'
import { render } from 'test/utils'
import * as factory from 'test/factory'
import { EpisodeList } from './EpisodeList'

describe('<EpisodeList />', () => {
  it('renders the list of episodes', () => {
    render(<EpisodeList episodes={factory.episode.buildList(10)} />)
    expect(screen.getAllByRole('article')).toHaveLength(10)
  })
})
