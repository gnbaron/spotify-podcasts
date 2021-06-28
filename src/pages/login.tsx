import { useEffect, useState } from 'react'
import { Login } from 'app/login'

export default function LoginPage() {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('error')) setFailed(true)
  }, [])

  return <Login failed={failed} />
}
