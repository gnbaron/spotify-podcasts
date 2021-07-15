import { useEffect, useState } from 'react'
import { Login } from 'app/login'

export default function LoginPage() {
  const [error, setError] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('error')) setError(true)
  }, [])

  return <Login error={error} />
}
