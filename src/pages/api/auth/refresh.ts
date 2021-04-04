import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const { refreshToken } = req.body

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
    })
    const { access_token } = await response.json()
    res.status(200).json({ accessToken: access_token, refreshToken })
  } catch (error) {
    res.status(500).json({ error: 'invalid_token' })
  }
}
