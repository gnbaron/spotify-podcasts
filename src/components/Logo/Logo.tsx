import classNames from 'classnames'
import Image from 'next/image'
import spotifyIcon from '../../../public/img/icon.png'

import styles from './Logo.module.css'

const SIZE = {
  s: 40,
  m: 50,
  l: 60,
}

type Props = {
  className?: string
  size: keyof typeof SIZE
}

export const Logo = ({ className, size }: Props) => (
  <div className={classNames(styles.wrapper, styles[size], className)}>
    <Image
      src={spotifyIcon}
      height={SIZE[size]}
      priority
      quality={100}
      role="presentation"
      width={SIZE[size]}
    />
    <h1>Podcasts</h1>
  </div>
)
