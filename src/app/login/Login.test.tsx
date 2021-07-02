import { render, screen } from '@testing-library/react'
import { Login } from './Login'

describe('<Login />', () => {
  it('renders the heading', () => {
    render(<Login />)
    screen.getByRole('heading')
  })

  it('renders the login link', () => {
    render(<Login />)
    const link = screen.getByRole('link', { name: /log in using spotify/i })
    expect(link).toHaveAttribute('href', '/api/auth/login')
  })

  it('renders the try again link when failed', () => {
    render(<Login failed />)
    const link = screen.getByRole('link', { name: /try again/i })
    expect(link).toHaveAttribute('href', '/api/auth/login')
    screen.getByText(/you shall not pass/i)
  })

  it('renders the footer', () => {
    render(<Login />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent(
      /this is a non official app built just for fun/i
    )
  })
})
