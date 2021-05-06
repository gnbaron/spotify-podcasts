import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { NavBar } from './NavBar'

describe('<NavBar />', () => {
  it('renders the heading', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    )
    screen.getByRole('heading', {
      name: /podcasts/i,
    })
  })

  it('renders the nav links', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    )
    expect(screen.getByText(/shows/i).closest('a')).toHaveAttribute(
      'href',
      '/shows'
    )
    expect(screen.getByText(/episodes/i).closest('a')).toHaveAttribute(
      'href',
      '/episodes'
    )
  })
})
