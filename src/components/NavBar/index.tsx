import { Logo } from 'components/Logo'

import styles from './index.module.css'

export const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Logo size="m" />
      <ul className={styles.menu}>
        <li>Shows</li>
        <li>New Episodes</li>
      </ul>
    </nav>
  )
}
