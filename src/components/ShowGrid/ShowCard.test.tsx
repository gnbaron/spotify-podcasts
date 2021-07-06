import { screen } from '@testing-library/react'
import { render } from 'test/utils'
import * as factory from 'test/factory'
import { ShowCard } from './ShowCard'

describe('<ShowCard />', () => {
  it('renders link to show details', () => {
    const show = factory.show.build()
    const { container } = render(<ShowCard show={show} />)
    expect(container.querySelector('a')).toHaveAttribute(
      'href',
      `/shows/${show.id}`
    )
  })

  it('renders show cover', () => {
    const show = factory.show.build()
    const cover = show.images[1] || show.images[0]
    render(<ShowCard show={show} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', cover.url)
  })

  it('renders show name and publisher', () => {
    const show = factory.show.build()
    render(<ShowCard show={show} />)
    screen.getByText(show.name)
    screen.getByText(show.publisher)
  })
})
