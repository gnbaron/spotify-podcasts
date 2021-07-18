import { PrimaryButton } from 'components/Button'
import { Logo } from 'components/Logo'

import styles from './Login.module.css'

type Props = {
  failed?: boolean
}

export const Login = ({ failed }: Props) => (
  <div className={styles.login}>
    <header>
      <Logo renderHeading size="l" />
    </header>
    <main>
      {failed && (
        <div className={styles.error}>
          <span>🧙‍♂️</span>
          <span>you shall not pass</span>
        </div>
      )}
      <PrimaryButton className={styles.button} href="/api/auth/login" size="s">
        {failed ? 'Try again' : 'Log in using Spotify'}
      </PrimaryButton>
    </main>
    <footer>
      <span>This is a non official app built just for fun.</span>
      <a
        className={styles.code}
        href="https://github.com/gnbaron/spotify-podcasts"
      >
        source code
      </a>
    </footer>
  </div>
)
