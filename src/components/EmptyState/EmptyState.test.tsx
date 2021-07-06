import { screen } from '@testing-library/react'
import { render } from 'test/utils'
import { EmptyState } from './EmptyState'

describe('<EmptyState />', () => {
  it.each(['s' as const, 'm' as const, 'l' as const])(
    'renders the empty state when size is %s',
    (size) => {
      const { container } = render(
        <EmptyState size={size} subtitle="nothing to see here" title="whoops" />
      )
      expect(container.firstChild).toHaveClass(size)
      screen.getByRole('heading', { name: /whoops/i })
      screen.getByAltText(/person looking into empty box/i)
      screen.getByRole('heading', { name: /nothing to see here/i })
    }
  )
})
