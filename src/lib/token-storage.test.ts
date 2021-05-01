import TokenStorage from './token-storage'

const accessToken = 'validaccesstoken'
const refreshToken = 'somerefreshtoken'

describe('token storage', () => {
  beforeEach(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  })

  it('saves the access and refresh tokens', () => {
    TokenStorage.save({ accessToken, refreshToken })
    expect(localStorage.getItem('accessToken')).toBe(accessToken)
    expect(localStorage.getItem('refreshToken')).toBe(refreshToken)
  })

  it('reads the tokens', () => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    expect(TokenStorage.read()).toMatchObject({
      accessToken,
      refreshToken,
    })
  })

  it('removes the tokens', () => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    TokenStorage.remove()
    expect(localStorage.getItem('accessToken')).toBeNull()
    expect(localStorage.getItem('refreshToken')).toBeNull()
  })
})
