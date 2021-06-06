import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { Analytics } from 'components/Analytics'
import { GithubLink } from 'components/GithubLink'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <GithubLink />
          <Main />
          <NextScript />
          <Analytics />
        </body>
      </Html>
    )
  }
}

export default MyDocument
