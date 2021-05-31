import TokenStorage from 'lib/token-storage'
import { Tokens } from 'types/common'
import { useFreshTokens } from 'lib/auth-queries'

type Props = {
  children: React.ReactNode
  tokens: Tokens | null
}

export const AuthenticationProvider = (props: Props) => {
  if (props.tokens) {
    TokenStorage.save(props.tokens)
  }
  const query = useFreshTokens()
  return query.status !== 'success' ? null : <>{props.children}</>
}
