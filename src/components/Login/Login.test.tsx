import { render, screen } from '@testing-library/react'
import { Login } from './Login'

describe('<Login />', () => {
  it('renders the heading', () => {
    render(<Login />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('renders the login link', () => {
    render(<Login />)
    const link = screen.getByRole('link', { name: /log in to spotify/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/api/auth/login')
  })

  it('renders the try again link', () => {
    render(<Login failed />)
    const link = screen.getByRole('link', { name: /try again/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/api/auth/login')
    expect(screen.getByText(/you shall not pass/i)).toBeInTheDocument()
  })

  it('renders the footer', () => {
    render(<Login />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveTextContent(
      /this is a non official app built just for fun/i
    )
  })
})
