import { NavLink } from 'react-router-dom'
import { Logo } from 'components/Logo'
import { Profile } from './Profile'

import styles from './NavBar.module.css'

export const NavBar = () => (
  <nav className={styles.navbar}>
    <Logo className={styles.logo} size="m" />
    <ul className={styles.menu}>
      <li>
        <NavLink to="/shows" activeClassName={styles.active}>
          <span>Shows</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/library" activeClassName={styles.active}>
          <span>Saved</span>
        </NavLink>
      </li>
    </ul>
    <div className={styles.profile}>
      <Profile />
    </div>
  </nav>
)
