import { screen } from '@testing-library/react'
import { factory, render } from 'test/utils'
import { DetailsPage } from './DetailsPage'

describe('<DetailsPage />', () => {
  const defaults = {
    cover: factory.image.build(),
    headingContent: <p>description</p>,
    subtitle: 'Publisher',
    title: 'Awesome Podcast',
  }

  it('renders the details header', () => {
    render(<DetailsPage {...defaults} />)
    screen.getByRole('heading', { name: /awesome podcast/i })
    screen.getByRole('heading', { name: /publisher/i })
    screen.getByText(/description/i)
  })

  it('renders the subtitle as a link when subtitleHref is set', () => {
    const subtitleHref = '/show/2/episode/1'
    render(<DetailsPage {...defaults} subtitleHref={subtitleHref} />)
    const link = screen
      .getByRole('heading', { name: /publisher/i })
      .closest('a')
    expect(link).toHaveAttribute('href', subtitleHref)
  })

  it('renders the cover image', () => {
    render(<DetailsPage {...defaults} />)
    const cover = screen.getByRole('img')
    expect(cover).toHaveAttribute('src', defaults.cover.url)
  })

  it('renders the details body', () => {
    const body = 'Lorem ipsum dolor sit amet.'
    render(
      <DetailsPage {...defaults}>
        <p>{body}</p>
      </DetailsPage>
    )
    screen.getByText(body)
  })
})
