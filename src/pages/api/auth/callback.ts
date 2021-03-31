import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import querystring from 'query-string'
import { clearCookie } from 'utils/cookies'
import { STATE_KEY } from './login'

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

export default (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null

  if (state === null || state !== storedState) {
    res.redirect(`/login?${querystring.stringify({ error: 'state_mismatch' })}`)
  } else {
    clearCookie(res, STATE_KEY)

    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/api/auth/callback`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
    })
      .then((res) => res.json())
      .then(({ access_token, refresh_token }) =>
        res.redirect(
          `/login?${querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
          })}`
        )
      )
      .catch(() =>
        res.redirect(
          `/login?${querystring.stringify({ error: 'invalid_token' })}`
        )
      )
  }
}
