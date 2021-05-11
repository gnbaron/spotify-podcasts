import { render, screen } from '@testing-library/react'
import { BasePage } from './BasePage'

describe('<BasePage />', () => {
  it('renders the content', () => {
    render(<BasePage>content</BasePage>)
    screen.getByText(/content/i)
  })

  it('renders the heading', () => {
    render(<BasePage heading="Shows">content</BasePage>)
    screen.getByRole('heading', {
      name: /shows/i,
    })
  })

  it('renders with a custom heading', () => {
    render(
      <BasePage>
        <h2>custom heading</h2>
      </BasePage>
    )
    screen.getByRole('heading', {
      name: /custom heading/i,
    })
  })
})
