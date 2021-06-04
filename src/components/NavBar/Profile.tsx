import { Button } from 'components/Button'
import { useProfile } from 'lib/spotify-queries'

import styles from './Profile.module.css'

export const Profile = () => {
  const profile = useProfile({ suspense: false })

  if (!profile.data) return null

  const avatarUrl = profile.data.images
    ? profile.data.images[0].url
    : '/img/empty-avatar.png'

  return (
    <div className={styles.profile}>
      <img src={avatarUrl} />
      <span className={styles.name}>{profile.data.display_name}</span>
      <Button className={styles.logout} quiet>
        Logout
      </Button>
    </div>
  )
}
