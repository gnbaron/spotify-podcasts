export const EXPIRATION_TIME = 3600 * 1000 // 1h

type Tokens = {
  access_token: string
  expired: boolean
  refresh_token: string
}

const save = ({
  access_token,
  refresh_token,
}: {
  access_token: string
  refresh_token?: string
}) => {
  localStorage.setItem('token_timestamp', Date.now().toString())
  localStorage.setItem('access_token', access_token)
  refresh_token && localStorage.setItem('refresh_token', refresh_token)
}

const read = (): Tokens | null => {
  const access_token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')

  if (!access_token || !refresh_token) return null

  const timestamp = parseInt(localStorage.getItem('token_timestamp') || '0')
  const expired = Date.now() - timestamp > EXPIRATION_TIME

  return { access_token, expired, refresh_token }
}

const remove = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('token_timestamp')
}

const TokenStorage = { save, read, remove }

export default TokenStorage
