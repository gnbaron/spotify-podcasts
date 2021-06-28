import { useEffect } from 'react'
import NProgress from 'nprogress'

export const Loading = () => {
  useEffect(() => {
    NProgress.set(0.3)
    NProgress.start()
    return () => {
      setTimeout(() => {
        NProgress.done()
      }, 200)
    }
  }, [])

  return null
}
