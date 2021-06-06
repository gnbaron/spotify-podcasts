import type { NextApiRequest, NextApiResponse } from 'next'
import querystring from 'query-string'
import { setCookie } from 'utils/cookies'

export const STATE_KEY = 'spotify_auth_state'

const CLIENT_ID = process.env.CLIENT_ID
const AUTH_REDIRECT_URI = process.env.AUTH_REDIRECT_URI

export default (req: NextApiRequest, res: NextApiResponse) => {
  const state = generateRandomString(16)
  setCookie(res, STATE_KEY, state)

  const scope =
    'user-read-private user-read-email user-library-read user-library-modify'
  const query = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: AUTH_REDIRECT_URI,
    state: state,
  })

  res.redirect(`https://accounts.spotify.com/authorize?${query}`)
}

export const generateRandomString = (length: number) => {
  let text = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return text
}
