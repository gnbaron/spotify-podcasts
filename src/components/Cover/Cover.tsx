import classNames from 'classnames'

import styles from './Cover.module.css'

type Props = {
  className?: string
  image: SpotifyApi.ImageObject
  size: 's' | 'm' | 'l'
}

export const Cover = ({ className, image, size }: Props) => (
  <img
    className={classNames(className, styles.cover, styles[size])}
    src={image.url}
    role="presentation"
  />
)
