import { Tokens } from 'types/common'

const save = ({ accessToken, refreshToken }: Tokens) => {
  accessToken && localStorage.setItem('accessToken', accessToken)
  refreshToken && localStorage.setItem('refreshToken', refreshToken)
}

const read = (): Tokens | null => {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  if (!accessToken || !refreshToken) return null
  return { accessToken, refreshToken }
}

const remove = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

const EMPTY: Tokens = {
  accessToken: '',
  refreshToken: '',
}

const TokenStorage = { EMPTY, save, read, remove }

export default TokenStorage
