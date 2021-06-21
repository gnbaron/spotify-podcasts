import { useIsWideScreen } from 'utils/use-media-query'
import { Logo } from 'components/Logo'
import { Menu } from './Menu'
import { Profile } from './Profile'

import styles from './NavBar.module.css'

export const NavBar = () => {
  const isWideScreen = useIsWideScreen()
  return (
    <nav className={styles.navbar}>
      <Logo className={styles.logo} renderHeading={isWideScreen} size="m" />
      <Menu />
      <Profile />
    </nav>
  )
}
