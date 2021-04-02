import TokenStorage, { EXPIRATION_TIME } from './token-storage'

const access_token = 'validaccesstoken'
const refresh_token = 'somerefreshtoken'

describe('token storage', () => {
  beforeEach(() => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('token_timestamp')
  })

  it('saves the access and refresh tokens', () => {
    TokenStorage.save({ access_token, refresh_token })
    expect(localStorage.getItem('access_token')).toBe(access_token)
    expect(localStorage.getItem('refresh_token')).toBe(refresh_token)
    expect(localStorage.getItem('token_timestamp')).toBeDefined()
  })

  it('saves only the access token', () => {
    localStorage.setItem('access_token', 'previousvalue')
    localStorage.setItem('refresh_token', 'previousvalue')
    localStorage.setItem('token_timestamp', 'previousvalue')
    TokenStorage.save({ access_token })
    expect(localStorage.getItem('access_token')).not.toBe('previousvalue')
    expect(localStorage.getItem('refresh_token')).toBe('previousvalue')
    expect(localStorage.getItem('token_timestamp')).not.toBe('previousvalue')
  })

  it('reads the tokens', () => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    localStorage.setItem('token_timestamp', Date.now().toString())
    const tokens = TokenStorage.read()
    expect(tokens).toMatchObject({
      access_token,
      expired: false,
      refresh_token,
    })
  })

  it('reads the tokens when expired', () => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    localStorage.setItem(
      'token_timestamp',
      (Date.now() - EXPIRATION_TIME - 1).toString()
    )
    const tokens = TokenStorage.read()
    expect(tokens).toMatchObject({
      access_token,
      expired: true,
      refresh_token,
    })
  })

  it('removes the tokens', () => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    localStorage.setItem('token_timestamp', Date.now().toString())
    TokenStorage.remove()
    expect(localStorage.getItem('access_token')).toBeNull()
    expect(localStorage.getItem('refresh_token')).toBeNull()
    expect(localStorage.getItem('token_timestamp')).toBeNull()
  })
})
