import { screen } from '@testing-library/react'
import { render } from 'test/utils'
import { Logo } from './Logo'

describe('<Logo />', () => {
  it('renders the heading', () => {
    render(<Logo size="s" renderHeading />)
    screen.getByRole('heading', {
      name: /podcasts/i,
    })
  })

  it('renders the heading hidden', () => {
    render(<Logo size="s" />)
    const heading = screen.getByRole('heading', {
      name: /podcasts/i,
    })
    expect(heading.parentNode).toHaveClass('hidden')
  })

  it.each(['s' as const, 'm' as const, 'l' as const])(
    'renders the logo when size is %s',
    (size) => {
      const { container } = render(<Logo size={size} />)
      expect(container.firstChild).toHaveClass(size)
    }
  )
})
