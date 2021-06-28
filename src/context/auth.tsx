import { createContext, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import { useSession, useUser } from 'queries/auth-queries'
import TokenStorage from 'utils/token-storage'
import { Loading } from 'components/Loading'
import { Tokens, User } from 'types/common'

type Context = {
  logout: () => void
  user: User | null
}

const AuthContext = createContext<Context | null>(null)

type Props = {
  children: React.ReactNode
  tokens: Tokens | null
}

export const AuthProvider = ({ children, tokens }: Props) => {
  const session = useSession(tokens)
  const user = useUser({ enabled: session.isSuccess })

  const router = useRouter()

  const logout = useCallback(() => {
    TokenStorage.remove()
    router.push('/login')
  }, [router])

  if (session.isError) router.push('/login')

  if (session.isLoading) return <Loading />

  return (
    <AuthContext.Provider value={{ logout, user: user.data || null }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error('useAuth should be used within AuthContext')
  }

  return context
}
