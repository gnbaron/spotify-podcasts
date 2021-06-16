import { useRouter } from 'next/router'
import { useProfile } from 'lib/spotify-queries'
import { Button } from 'components/Button'

import styles from './Profile.module.css'
import TokenStorage from 'lib/token-storage'

export const Profile = () => {
  const router = useRouter()
  const profile = useProfile()

  if (!profile.data) return null

  const avatarUrl = profile.data.images
    ? profile.data.images[0].url
    : '/img/avatar.svg'

  const handleLogout = () => {
    TokenStorage.remove()
    router.push('/login')
  }

  return (
    <div className={styles.profile}>
      <img src={avatarUrl} />
      <span className={styles.name}>{profile.data.display_name}</span>
      <Button className={styles.logout} onClick={handleLogout} quiet size="s">
        Logout
      </Button>
    </div>
  )
}
