import { render, screen } from '@testing-library/react'
import { Container } from './Container'

describe('<Container />', () => {
  it('wraps the content with a Container', () => {
    render(<Container className="custom">content</Container>)
    const container = screen.getByText(/content/i)
    expect(container).toHaveClass('custom')
  })
})
