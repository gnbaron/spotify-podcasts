import { render, screen } from '@testing-library/react'
import { BasePage } from './BasePage'

describe('<BasePage />', () => {
  it('renders the title', () => {
    render(<BasePage title="Shows">content</BasePage>)
    screen.getByRole('heading', {
      name: /shows/i,
    })
  })

  it('renders the content', () => {
    render(<BasePage title="Shows">content</BasePage>)
    screen.getByText(/content/i)
  })
})
