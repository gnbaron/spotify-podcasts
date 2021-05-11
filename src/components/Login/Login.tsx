import { Button } from 'components/Button'
import { Logo } from 'components/Logo'

import styles from './Login.module.css'

type Props = {
  failed?: boolean
}

export const Login = ({ failed }: Props) => (
  <div className={styles.login}>
    <header>
      <Logo className={styles.logo} size="l" />
    </header>
    <main>
      {failed && (
        <div className={styles.error}>
          <span>🧙‍♂️</span>
          <span>you shall not pass</span>
        </div>
      )}
      <Button className={styles.button} href="/api/auth/login">
        {failed ? 'Try again' : 'Log in using Spotify'}
      </Button>
    </main>
    <footer>
      <span>This is a non official app built just for fun.</span>
      <a href="https://github.com/gnbaron/spotify-podcasts">source code</a>
    </footer>
  </div>
)
