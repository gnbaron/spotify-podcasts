import { screen } from '@testing-library/react'
import { factory, render } from 'test/utils'
import { LazyCover } from './LazyCover'

describe('<LazyCover />', () => {
  it.each(['xs' as const, 's' as const, 'm' as const, 'l' as const])(
    'renders the cover image when size is %s',
    (size) => {
      const cover = factory.image.build()
      render(<LazyCover image={cover} size={size} />)
      const img = screen.getByRole('img')
      expect(img).toHaveClass(size)
      expect(img).toHaveAttribute('src', cover.url)
    }
  )
})
