import { useState } from 'react'
import classNames from 'classnames'
import { FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from 'context/auth'
import { Button, IconButton } from 'components/Button'
import { OnlySmallScreen, OnlyWideScreen } from 'components/ResponsiveContainer'

import styles from './Profile.module.css'

export const Profile = () => {
  const [loaded, setLoaded] = useState(false)
  const { user, logout } = useAuth()

  if (!user) return <div className={classNames(styles.profile)} />

  const avatarUrl = user.images ? user.images[0].url : '/img/avatar.svg'

  return (
    <div className={classNames(styles.profile, loaded && styles.loaded)}>
      <img
        className={styles.avatar}
        src={avatarUrl}
        onLoad={() => setLoaded(true)}
      />
      <OnlySmallScreen>
        <IconButton className={styles.logout} onClick={logout} quiet size="l">
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
