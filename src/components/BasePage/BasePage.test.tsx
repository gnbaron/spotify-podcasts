import { screen } from '@testing-library/react'
import { mockScreenSize, render } from 'test/utils'
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

  describe('when screen is wide', () => {
    beforeAll(() => mockScreenSize('wide'))

    it('does not render the heading', () => {
      render(<BasePage heading="Shows">content</BasePage>)
      expect(screen.queryByRole('heading')).toBeNull()
    })
  })
})
