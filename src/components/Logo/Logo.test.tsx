import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'

describe('<Logo />', () => {
  it('renders the title and logo', () => {
    render(<Logo size="s" />)
    screen.getByRole('heading', {
      name: /podcasts/i,
    })
  })

  it.each(['s' as const, 'm' as const, 'l' as const])(
    'renders %s sized logo',
    (size) => {
      const { container } = render(<Logo size={size} />)
      const wrapper = container.childNodes[0]
      expect(wrapper).toHaveClass(size)
    }
  )
})
