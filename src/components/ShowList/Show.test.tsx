import { render, screen } from '@testing-library/react'
import * as factory from 'test/factory'
import { Show } from './Show'

describe('<Show />', () => {
  it('renders the show cover, title and description', () => {
    const show = factory.show.build()
    render(<Show show={show} />)
    screen.getByRole(/figure/)
    screen.getByText(show.name)
    const description = screen.getByTestId('description')
    expect(description.textContent).toMatch(show.description)
  })
})
