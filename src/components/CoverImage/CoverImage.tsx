import classNames from 'classnames'

import styles from './CoverImage.module.css'

type Props = {
  className?: string
  images: SpotifyApi.ImageObject[]
  size: 's' | 'm' | 'l'
}

export const CoverImage = ({ className, images, size }: Props) => {
  const cover = images[1] || images[0]
  return (
    <img
      className={classNames(className, styles.cover, styles[size])}
      src={cover.url}
      role="presentation"
    />
  )
}
