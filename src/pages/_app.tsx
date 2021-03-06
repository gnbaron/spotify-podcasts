import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next.seo.config'

import 'styles/fonts.css'
import 'styles/global.css'
import 'styles/octocat.css'
import 'styles/scrollbar.css'

function SafeHydrate({ children }: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning style={{ height: '100%' }}>
      {typeof document === 'undefined' ? null : children}
    </div>
  )
}

export default function App({ Component, pageProps, router }: AppProps) {
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
        options={{ showSpinner: false, trickleSpeed: 150 }}
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
