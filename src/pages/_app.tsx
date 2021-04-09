import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { addViewportHeightListener } from 'utils/vh-listener'
import { GithubLink } from 'components/GithubLink'

import 'styles/global.css'

function SafeHydrate({ children }: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning>
      {typeof document === 'undefined' ? null : children}
    </div>
  )
}

function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => addViewportHeightListener(), [])

  return (
    <>
      <NextHead>
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <link rel="apple-touch-icon" href="/img/favicon.ico" />
      </NextHead>
      <NextNProgress
        color="#1ed760"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      {router.route.match(/login/) ? (
        <Component {...pageProps} />
      ) : (
        // the app is rendered on the client side
        <SafeHydrate>
          <GithubLink />
          <Component {...pageProps} />
        </SafeHydrate>
      )}
    </>
  )
}

export default App
