import { render as rtlRender } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import { Providers } from 'app'
import { User } from 'types/common'
import { createTestQueryClient, flushQueries } from './query-helpers'
import { mockAuthenticatedUser } from './api-helpers'

/**
 * Render a component wrapped by `<Providers />`.
 * @returns testing-library@render result and authenticated `user`.
 */
export function render(
  ui: React.ReactElement,
  options: { pathname?: string; route?: string; user?: User } = {}
) {
  const { tokens, user } = mockAuthenticatedUser(options.user)

  const queryClient = createTestQueryClient()

  return {
    user,
    flushQueries: () => flushQueries(queryClient),
    ...rtlRender(
      <Providers queryClient={queryClient} tokens={tokens}>
        <MemoryRouter initialEntries={[options.pathname || '/']}>
          <Route path={options.route || '/'}>{ui}</Route>
        </MemoryRouter>
      </Providers>
    ),
  }
}
