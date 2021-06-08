import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next.seo.config'

import 'styles/global.css'
import 'styles/github-corner.css'

function SafeHydrate({ children }: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning>
      {typeof document === 'undefined' ? null : children}
    </div>
  )
}

function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <NextHead>
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <link rel="apple-touch-icon" href="/img/favicon.ico" />
      </NextHead>
      <DefaultSeo {...SEO} />
      <NextNProgress
        color="#1ed760"
        height={3}
        options={{ showSpinner: false }}
        startPosition={0.3}
        stopDelayMs={200}
      />
      {router.route.match(/login/) ? (
        <Component {...pageProps} />
      ) : (
        // rendered on the client side
        <SafeHydrate>
          <Component {...pageProps} />
        </SafeHydrate>
      )}
    </>
  )
}

export default App
