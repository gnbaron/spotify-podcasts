import { render as rtlRender } from '@testing-library/react'
import { QueryClient } from 'react-query'
import nock from 'nock'
import { Providers } from 'app'
import { queryClientDefaults } from 'queries/query-client'
import { BASE_URL } from 'queries/spotify-api'
import { useIsWideScreen } from 'hooks/useMediaQuery'
import * as factory from 'test/factory'
import { User } from 'types/common'

jest.mock('hooks/useMediaQuery')

/**
 * Cast a function mocked by `jest.mock` to `jest.Mock` type.
 */
export function asMock<T>(unmocked: T) {
  return unmocked as T & jest.Mock
}

/**
 * Mock `useIsWideScreen` hook to simulate 'small' or 'wide' screen size.
 */
export function mockScreenSize(size: 'small' | 'wide') {
  asMock(useIsWideScreen).mockReturnValue(size === 'wide')
}

/**
 * Render a component wrapped by `<Providers />`.
 * @param ui node to be rendered
 * @returns testing-library@render result and authenticated `user`
 */
export function render(ui: React.ReactElement, options: { user?: User } = {}) {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      ...queryClientDefaults,
      queries: { ...queryClientDefaults.queries, retry: false },
      mutations: { ...queryClientDefaults.mutations, retry: false },
    },
  })

  const { tokens, user } = mockAuthenticatedUser(options.user)

  return {
    user,
    ...rtlRender(
      <Providers queryClient={testQueryClient} tokens={tokens}>
        {ui}
      </Providers>
    ),
  }
}

export function mockSpotifyAPI() {
  return nock(BASE_URL)
}

export function mockAuthenticatedUser(user: User = factory.user.build()) {
  const tokens = {
    accessToken: 'accesstoken',
    refreshToken: 'refreshtoken',
  }

  nock('http://localhost')
    .persist()
    .post('/api/auth/refresh')
    .reply(200, tokens)

  mockSpotifyAPI().get('/me').reply(200, user)

  return { tokens, user }
}
