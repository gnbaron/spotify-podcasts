import { useState } from 'react'
import classNames from 'classnames'
import { FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from 'context/AuthContext'
import { Button, IconButton } from 'components/Button'
import { OnlySmallScreen, OnlyWideScreen } from 'components/Responsive'

import styles from './Profile.module.css'

export const Profile = () => {
  const [loaded, setLoaded] = useState(false)
  const { user, logout } = useAuth()

  if (!user) return <div className={classNames(styles.profile)} />

  const avatarUrl =
    user.images && user.images[0] ? user.images[0].url : '/img/avatar.svg'

  return (
    <div className={classNames(styles.profile, loaded && styles.loaded)}>
      <img
        alt="img"
        className={styles.avatar}
        onLoad={() => setLoaded(true)}
        src={avatarUrl}
      />
      <OnlySmallScreen>
        <IconButton
          className={styles.logout}
          label="Logout"
          onClick={logout}
          quiet
          size="l"
        >
          <FaSignOutAlt />
        </IconButton>
      </OnlySmallScreen>
      <OnlyWideScreen>
        <span className={styles.name}>{user.display_name}</span>
        <Button className={styles.logout} onClick={logout} quiet size="s">
          Logout
        </Button>
      </OnlyWideScreen>
    </div>
  )
}
