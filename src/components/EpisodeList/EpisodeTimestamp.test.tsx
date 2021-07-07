import { screen } from '@testing-library/react'
import { factory, render } from 'test/utils'
import { EpisodeTimestamp } from './EpisodeTimestamp'

const MINUTE = 60 * 1000

describe('<EpisodeTimestamp />', () => {
  it('renders the episode release date and duration', () => {
    const episode = factory.episode.build({
      duration_ms: 35 * MINUTE,
      release_date: '2021-07-04T22:31:14.189Z',
    })
    render(<EpisodeTimestamp episode={episode} />)
    screen.getByText(/Jul 04/i)
    screen.getByText(/35 min/i)
  })
})
