import { screen, render as utilsRender } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Menu } from './Menu'

/**
 * Render the `<Menu />` within a `<MemoryRouter />`.
 */
function render(currentPath: string) {
  return utilsRender(
    <MemoryRouter initialEntries={[currentPath]}>
      <Menu />
    </MemoryRouter>
  )
}

const queryCurrentTab = () => {
  const tablist = screen.getByRole('tablist')
  return tablist.querySelector('[aria-current="page"] > a')
}

describe('<Menu />', () => {
  it('renders the navigation list', () => {
    render('/')
    screen.getByRole('tablist')
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  it('highlights "Shows" when current path is /shows', () => {
    render('/shows')
    const current = queryCurrentTab()
    expect(current).toHaveAttribute('href', '/shows')
  })

  it('highlights "Shows" when current path is /shows/*', () => {
    render('/shows/4kYCRYJ3yK5DQbP5tbfZby')
    const current = queryCurrentTab()
    expect(current).toHaveAttribute('href', '/shows')
  })

  it('highlights "Episodes" when current path is /episodes', () => {
    render('/episodes')
    const current = queryCurrentTab()
    expect(current).toHaveAttribute('href', '/episodes')
  })

  it('highlights "Episodes" when current path is /episodes/*', () => {
    render('/episodes/5HE1rN9RmFuKyXGKxiQSwW')
    const current = queryCurrentTab()
    expect(current).toHaveAttribute('href', '/episodes')
  })

  it('highlights "Search" when current path is /search', () => {
    render('/search')
    const current = queryCurrentTab()
    expect(current).toHaveAttribute('href', '/search')
  })

  it('highlights "Search" when current path is /search/*', () => {
    render('/search?query=travel&type=show')
    const current = queryCurrentTab()
    expect(current).toHaveAttribute('href', '/search')
  })
})
