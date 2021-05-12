import classNames from 'classnames'

import styles from './ShowCover.module.css'

type Props = {
  className?: string
  images: SpotifyApi.ImageObject[]
}

export const ShowCover = ({ className, images }: Props) => {
  const cover = images[1] || images[0]
  return (
    <img
      className={classNames(className, styles.cover)}
      src={cover.url}
      role="presentation"
    />
  )
}
