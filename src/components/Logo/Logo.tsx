import classNames from 'classnames'
import Image from 'next/image'
import { ScreenReaderOnly } from 'components/ScreenReaderOnly'
import spotifyIcon from '../../../public/img/icon.png'

import styles from './Logo.module.css'

const SIZE = {
  s: 40,
  m: 50,
  l: 60,
}

type Props = {
  className?: string
  renderHeading?: boolean
  size: keyof typeof SIZE
}

export const Logo = ({ className, renderHeading, size }: Props) => (
  <div className={classNames(styles.wrapper, styles[size], className)}>
    <Image
      className={styles.img}
      src={spotifyIcon}
      height={SIZE[size]}
      priority
      quality={100}
      role="presentation"
      width={SIZE[size]}
    />
    {renderHeading ? (
      <h1>Podcasts</h1>
    ) : (
      <ScreenReaderOnly>
        <h1>Spotify Podcasts</h1>
      </ScreenReaderOnly>
    )}
  </div>
)
