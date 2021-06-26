import TokenStorage from 'lib/token-storage'
import { Tokens } from 'types/common'

export class MissingTokenError extends Error {
  constructor() {
    super('refreshToken is missing')
    this.name = 'MissingTokenError'
  }
}

export async function fetchTokens(): Promise<Tokens> {
  const stored = TokenStorage.read()

  if (!stored?.refreshToken) throw new MissingTokenError()

  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: stored.refreshToken }),
  })

  if (!response.ok) throw Error("can't refresh the access token")

  return await response.json()
}
