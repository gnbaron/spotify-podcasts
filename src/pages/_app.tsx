import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { GithubLink } from 'components/GithubLink'
import { addViewportHeightListener } from 'utils/vh-listener'

import 'styles/global.css'

function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => addViewportHeightListener(), [])

  return (
    <>
      <NextHead>
        <link rel="shortcut icon" href="/img/favicon.png" />
        <link rel="apple-touch-icon" href="/img/favicon.png" />
      </NextHead>
      <NextNProgress
        color="#1ed760"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      {!router.route.match(/login/) && <GithubLink />}
      <Component {...pageProps} />
    </>
  )
}

export default App
