import { render as rtlRender } from '@testing-library/react'
import { Providers } from 'app'
import { User } from 'types/common'
import { createTestQueryClient, flushQueries } from './query-helpers'
import { mockAuthenticatedUser } from './api-helpers'

/**
 * Render a component wrapped by `<Providers />`.
 * @returns testing-library@render result and authenticated `user`.
 */
export function render(ui: React.ReactElement, options: { user?: User } = {}) {
  const { tokens, user } = mockAuthenticatedUser(options.user)

  const queryClient = createTestQueryClient()

  return {
    user,
    flushQueries: () => flushQueries(queryClient),
    ...rtlRender(
      <Providers queryClient={queryClient} tokens={tokens}>
        {ui}
      </Providers>
    ),
  }
}
