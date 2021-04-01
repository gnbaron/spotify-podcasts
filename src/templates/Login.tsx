import { Button } from 'components/Button'

import styles from './Login.module.css'

type Props = {
  failed?: boolean
}

export function LoginTemplate({ failed }: Props) {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>
          Spotify <span className={styles.highlight}>Lite</span>
        </h1>
        <Button className={styles.button} href="/api/auth/login">
          {failed ? 'Try again' : 'Log in to Spotify'}
        </Button>
        {failed && <span className={styles.error}>Login failed</span>}
      </header>
      <footer className={styles.footer}>
        <span className={styles.disclaimer}>
          This is a non official app built just for fun.
        </span>
        <a href="https://github.com/gnbaron/spotify-lite">source code</a>
      </footer>
    </main>
  )
}
