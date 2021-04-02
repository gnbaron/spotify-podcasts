import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TokenStorage from 'lib/token-storage'

type Props = {
  tokens: null | {
    access_token: string
    refresh_token: string
  }
}

export default function HomePage({ tokens }: Props) {
  const [stored, setStored] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (tokens) {
      TokenStorage.save(tokens)
      setStored(true)
    }
  }, [tokens])

  useEffect(() => {
    if (!tokens && TokenStorage.read() === null) {
      router.push('/login')
    }
  }, [tokens, router])

  // remove tokens from query string
  useEffect(() => {
    if (stored && Object.keys(router.query).length) {
      router.replace(router.asPath, router.pathname, { shallow: true })
    }
  }, [stored, router])

  return null
}

export function getServerSideProps({ query }: NextPageContext) {
  const { access_token, refresh_token } = query
  const tokens =
    access_token && refresh_token ? { access_token, refresh_token } : null
  return {
    props: { tokens },
  }
}
