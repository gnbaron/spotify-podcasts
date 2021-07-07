import { screen } from '@testing-library/react'
import { factory, render } from 'test/utils'
import { ShowGrid } from './ShowGrid'

describe('<ShowGrid />', () => {
  it('renders the list of shows', () => {
    render(<ShowGrid shows={factory.show.buildList(10)} />)
    expect(screen.getAllByRole('article')).toHaveLength(10)
  })
})
