import { render, screen } from '@testing-library/react'
import { InfiniteScroll } from './InfiniteScroll'

const List = () => (
  <ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
  </ul>
)

describe('<InfiniteScroll />', () => {
  it('renders the list', () => {
    render(
      <InfiniteScroll>
        <List />
      </InfiniteScroll>
    )
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(3)
  })

  it('renders the load more trigger when has more data', () => {
    render(
      <InfiniteScroll hasMore>
        <List />
      </InfiniteScroll>
    )
    screen.getByTestId('loadMore')
  })

  it('renders a spinner when is loading', () => {
    render(
      <InfiniteScroll isLoading>
        <List />
      </InfiniteScroll>
    )
    screen.getByTestId('spinner')
  })
})
