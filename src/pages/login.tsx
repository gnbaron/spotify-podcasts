import { NextPageContext } from 'next'
import { LoginTemplate } from 'templates/Login'

type Props = {
  failed?: boolean
}

export default function LoginPage({ failed }: Props) {
  return <LoginTemplate failed={failed} />
}

export function getServerSideProps({ query }: NextPageContext) {
  return {
    props: {
      failed: Boolean(query.error),
    },
  }
}
