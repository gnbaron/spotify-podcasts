import { render, screen } from '@testing-library/react'
import { LoginTemplate } from './Login'

describe('<LoginTemplate />', () => {
  it('renders the heading', () => {
    render(<LoginTemplate />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('renders the login link', () => {
    render(<LoginTemplate />)
    const link = screen.getByRole('link', { name: /log in to spotify/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/api/auth/login')
  })

  it('renders the try again link', () => {
    render(<LoginTemplate failed />)
    const link = screen.getByRole('link', { name: /try again/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/api/auth/login')
    expect(screen.getByText(/login failed/i)).toBeInTheDocument()
  })

  it('renders the footer', () => {
    render(<LoginTemplate />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveTextContent(
      /this is a non official app built just for fun/i
    )
  })
})
