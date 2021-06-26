import { NextPageContext } from 'next'
import { Login } from 'app/login'
import { ParsedUrlQuery } from 'querystring'

type Props = {
  error?: ParsedUrlQuery['error']
}

export default function LoginPage({ error }: Props) {
  return <Login failed={Boolean(error)} />
}

export function getServerSideProps({ query }: NextPageContext) {
  return {
    props: { error: query.error },
  }
}
