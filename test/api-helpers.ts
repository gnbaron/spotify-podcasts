import nock from 'nock'
import { BASE_URL } from 'queries/spotify-api'
import { User } from 'types/common'
import * as factory from './factory'

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
