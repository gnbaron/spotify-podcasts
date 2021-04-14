import classNames from 'classnames'
import Image from 'next/image'

import styles from './index.module.css'

const SIZE = {
  s: 40,
  m: 50,
  l: 60,
}

type Props = {
  size: keyof typeof SIZE
}

export const Logo = ({ size }: Props) => {
  return (
    <div className={classNames(styles.wrapper, styles[size])}>
      <Image
        src="/img/icon.png"
        alt="spotify icon"
        width={SIZE[size]}
        height={SIZE[size]}
      />
      <h1>Podcasts</h1>
    </div>
  )
}
