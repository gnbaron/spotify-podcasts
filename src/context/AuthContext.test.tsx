import {
  render as rtlRender,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import router from 'next/router'
import nock from 'nock'
import { QueryClientProvider } from 'react-query'
import { createTestQueryClient, factory, mockSpotifyAPI } from 'test/utils'
import TokenStorage from 'utils/token-storage'
import { AuthProvider, useAuth } from './AuthContext'

const Child = () => {
  const { logout, user } = useAuth()
  return (
    <div>
      <span>{user ? `logged in as ${user.display_name}` : 'loading...'}</span>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

const render = (ui: React.ReactElement) =>
  rtlRender(
    <QueryClientProvider client={createTestQueryClient()}>
      {ui}
    </QueryClientProvider>
  )

describe('<AuthProvider />', () => {
  describe('when session is valid', () => {
    const user = factory.user.build({ display_name: 'John' })
    const tokens = {
      accessToken: 'accesstoken',
      refreshToken: 'refreshtoken',
    }

    beforeEach(() => {
      TokenStorage.save(tokens)
      nock('http://localhost').post('/api/auth/refresh').reply(200, tokens)
      mockSpotifyAPI().get('/me').reply(200, user)
    })

    afterEach(() => TokenStorage.clear())

    it('provides user profile data', async () => {
      render(
        <AuthProvider tokens={null}>
          <Child />
        </AuthProvider>
      )
      await waitForElementToBeRemoved(() =>
        document.body.querySelector('#nprogress')
      )
      await waitFor(() => screen.getByText(/logged in as John/i))
    })

    it('provides logout action', async () => {
      render(
        <AuthProvider tokens={null}>
          <Child />
        </AuthProvider>
      )
      await waitForElementToBeRemoved(() =>
        document.body.querySelector('#nprogress')
      )
      userEvent.click(screen.getByRole('button', { name: /logout/i }))
      await waitFor(() => expect(router.asPath).toBe('/login'))
    })
  })

  describe('when session is invalid', () => {
    beforeEach(() => {
      nock('http://localhost').post('/api/auth/refresh').reply(401)
    })

    it('redirects to /login when tokens are neither provided nor stored', async () => {
      render(
        <AuthProvider tokens={null}>
          <Child />
        </AuthProvider>
      )
      await waitFor(() => expect(router.asPath).toBe('/login'))
    })

    it('redirects to /login when tokens are invalid', async () => {
      TokenStorage.save({
        accessToken: 'invalid',
        refreshToken: 'invalid',
      })
      render(
        <AuthProvider tokens={null}>
          <Child />
        </AuthProvider>
      )
      await waitFor(() => expect(router.asPath).toBe('/login'))
    })
  })
})

describe('useAuth()', () => {
  it('throws error when used outside AuthContext', () => {
    function Component() {
      useAuth()
      return null
    }
    expect(() => render(<Component />)).toThrowError(
      /useAuth should be used within AuthContext/i
    )
  })
})
