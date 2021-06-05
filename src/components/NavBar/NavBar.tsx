import { Logo } from 'components/Logo'
import { Menu } from './Menu'
import { Profile } from './Profile'

import styles from './NavBar.module.css'

export const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Logo className={styles.logo} size="m" />
      <Menu />
      <Profile />
    </nav>
  )
}
