import { NextPageContext } from 'next'
import { Login } from 'components/Login'

type Props = {
  failed?: boolean
}

export default function LoginPage({ failed }: Props) {
  return <Login failed={failed} />
}

export function getServerSideProps({ query }: NextPageContext) {
  return {
    props: {
      failed: Boolean(query.error),
    },
  }
}
