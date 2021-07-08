import { screen } from '@testing-library/react'
import { render } from 'test/utils'
import { Menu } from './Menu'

const queryCurrentTab = () => {
  const tablist = screen.getByRole('tablist')
  return tablist.querySelector('[aria-current="page"] > a')
}

describe('<Menu />', () => {
  it('renders the navigation', () => {
    render(<Menu />, { pathname: '/' })
    screen.getByRole('tablist')
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  it('highlights "Shows" when current path is /shows', () => {
    render(<Menu />, { pathname: '/shows' })
    const current = queryCurrentTab()
    expect(current).toHaveAttribute('href', '/shows')
  })

  it('highlights "Shows" when current path is /shows/*', () => {
    render(<Menu />, { pathname: '/shows/4kYCRYJ3yK5DQbP5tbfZby' })
    const current = queryCurrentTab()
    expect(current).toHaveAttribute('href', '/shows')
  })

  it('highlights "Episodes" when current path is /episodes', () => {
    render(<Menu />, { pathname: '/episodes' })
    const current = queryCurrentTab()
    expect(current).toHaveAttribute('href', '/episodes')
  })

  it('highlights "Episodes" when current path is /episodes/*', () => {
    render(<Menu />, { pathname: '/episodes/5HE1rN9RmFuKyXGKxiQSwW' })
    const current = queryCurrentTab()
    expect(current).toHaveAttribute('href', '/episodes')
  })

  it('highlights "Search" when current path is /search', () => {
    render(<Menu />, { pathname: '/search' })
    const current = queryCurrentTab()
    expect(current).toHaveAttribute('href', '/search')
  })

  it('highlights "Search" when current path is /search/*', () => {
    render(<Menu />, { pathname: '/search?query=travel&type=show' })
    const current = queryCurrentTab()
    expect(current).toHaveAttribute('href', '/search')
  })
})
