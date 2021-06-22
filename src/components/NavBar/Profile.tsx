import { useState } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { FaSignOutAlt } from 'react-icons/fa'
import { useProfile } from 'lib/spotify-queries'
import TokenStorage from 'lib/token-storage'
import { Button, IconButton } from 'components/Button'
import { OnlySmallScreen, OnlyWideScreen } from 'components/ResponsiveContainer'

import styles from './Profile.module.css'

export const Profile = () => {
  const router = useRouter()
  const profile = useProfile()
  const [loaded, setLoaded] = useState(false)

  if (!profile.data) return <div className={classNames(styles.profile)} />

  const avatarUrl = profile.data.images
    ? profile.data.images[0].url
    : '/img/avatar.svg'

  const handleLogout = () => {
    TokenStorage.remove()
    router.push('/login')
  }

  return (
    <div className={classNames(styles.profile, loaded && styles.loaded)}>
      <img
        className={styles.avatar}
        src={avatarUrl}
        onLoad={() => setLoaded(true)}
      />
      <OnlySmallScreen>
        <IconButton
          className={styles.logout}
          onClick={handleLogout}
          quiet
          size="l"
        >
          <FaSignOutAlt />
        </IconButton>
      </OnlySmallScreen>
      <OnlyWideScreen>
        <span className={styles.name}>{profile.data.display_name}</span>
        <Button className={styles.logout} onClick={handleLogout} quiet size="s">
          Logout
        </Button>
      </OnlyWideScreen>
    </div>
  )
}
