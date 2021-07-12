import { Tokens } from 'types/common'

function save({ accessToken, refreshToken }: Tokens) {
  accessToken && localStorage.setItem('accessToken', accessToken)
  refreshToken && localStorage.setItem('refreshToken', refreshToken)
}

function read(): Tokens | null {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  if (!accessToken || !refreshToken) return null
  return { accessToken, refreshToken }
}

function clear() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

const EMPTY: Tokens = {
  accessToken: '',
  refreshToken: '',
}

const TokenStorage = { EMPTY, save, read, clear }

export default TokenStorage
