import { screen } from '@testing-library/react'
import { mockScreenSize, render } from 'test/utils'
import { NavBar } from './NavBar'

describe('<NavBar />', () => {
  it('hides the logo heading', () => {
    render(<NavBar />)
    const heading = screen.getByRole('heading', {
      name: /podcasts/i,
    })
    expect(heading.parentElement).toHaveClass('hidden')
  })

  describe('when screen size is wide', () => {
    beforeEach(() => mockScreenSize('wide'))

    it('renders the logo heading', () => {
      render(<NavBar />)
      const heading = screen.getByRole('heading', {
        name: /podcasts/i,
      })
      expect(heading.parentElement).not.toHaveClass('hidden')
    })
  })
})
