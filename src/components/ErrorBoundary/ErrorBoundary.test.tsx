import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from 'test/utils'
import { ErrorBoundary } from './ErrorBoundary'

const doSomething = jest
  .fn()
  .mockImplementationOnce(() => {
    throw Error('Unexpected error')
  })
  .mockImplementationOnce(() => ({ ok: true }))

const Child = () => {
  doSomething()
  return <h1>success</h1>
}

describe('<ErrorBoundary />', () => {
  it('renders the error boundary and retries rendering', () => {
    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    )
    screen.getByRole('heading', {
      name: /oh snap! something went wrong\./i,
    })
    screen.getByAltText(/person with a broken leg/i)
    userEvent.click(screen.getByRole('button', { name: /try again/i }))
    screen.getByRole('heading', {
      name: /success/i,
    })
  })
})
