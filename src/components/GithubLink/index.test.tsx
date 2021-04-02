import { render, screen } from '@testing-library/react'
import { GithubLink } from './index'

describe('<GithubLink />', () => {
  it('renders the link', () => {
    render(<GithubLink />)
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/gnbaron/spotify-podcasts'
    )
  })
})
