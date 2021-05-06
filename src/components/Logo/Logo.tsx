import classNames from 'classnames'
import Image from 'next/image'

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
      src="/img/icon.png"
      role="presentation"
      height={SIZE[size]}
      width={SIZE[size]}
    />
    <h1>Podcasts</h1>
  </div>
)
