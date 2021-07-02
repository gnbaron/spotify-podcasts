import TokenStorage from 'utils/token-storage'
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

  const response = await fetch(`${getBaseURL()}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: stored.refreshToken }),
  })

  if (!response.ok) throw Error("can't refresh the access token")

  return await response.json()
}

/**
 * Parse base url based on `window.location`.
 * This is needed because `node-fetch` does not accept relative urls, so tests would fail.
 */
function getBaseURL() {
  const { protocol, hostname, port } = window.location
  return `${protocol}//${hostname}${port ? `:${port}` : ''}`
}
