import { render, screen } from '@testing-library/react'
import * as factory from 'test/factory'
import { ShowCard } from './ShowCard'

describe('<ShowCard />', () => {
  it('renders the show cover, title and publisher', () => {
    const show = factory.show.build()
    render(<ShowCard show={show} />)
    screen.getByRole(/figure/)
    screen.getByText(show.name)
    screen.getByText(show.publisher)
  })
})
