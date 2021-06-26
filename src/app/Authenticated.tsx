import { useRouter } from 'next/router'
import { useFreshTokens } from 'lib/auth-queries'
import { Tokens } from 'types/common'
import { Loading } from 'components/Loading'

type Props = {
  children: React.ReactNode
  tokens: Tokens | null
}

export const Authenticated = ({ children, tokens }: Props) => {
  const router = useRouter()
  const query = useFreshTokens(tokens)

  if (query.isLoading) return <Loading />

  if (query.isSuccess && query.data) return <>{children}</>

  if (query.isError || !query.data) router.push('/login')

  return null
}
