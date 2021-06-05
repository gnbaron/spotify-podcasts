import { useRouter } from 'next/router'
import { useFreshTokens } from 'lib/auth-queries'
import { Tokens } from 'types/common'

type Props = {
  children: React.ReactNode
  tokens: Tokens | null
}

export const Authenticated = ({ children, tokens }: Props) => {
  const router = useRouter()
  const query = useFreshTokens(tokens)

  if (query.isSuccess && query.data) return <>{children}</>

  router.push('/login')
  return null
}
