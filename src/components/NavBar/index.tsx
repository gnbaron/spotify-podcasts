import { NavLink } from 'react-router-dom'
import { Logo } from 'components/Logo'

import styles from './index.module.css'

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
        <NavLink to="/episodes" activeClassName={styles.active}>
          <span>Episodes</span>
        </NavLink>
      </li>
    </ul>
  </nav>
)
