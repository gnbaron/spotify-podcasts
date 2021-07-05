import { render } from 'test/utils'
import { ScreenReaderOnly } from './ScreenReaderOnly'

describe('<ScreenReaderOnly />', () => {
  it('hides content from screen', () => {
    const { container } = render(<ScreenReaderOnly>content</ScreenReaderOnly>)
    expect(container.firstChild).toHaveClass('hidden')
  })
})
