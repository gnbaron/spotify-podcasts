import { useState } from 'react'
import classNames from 'classnames'
import { useIntersectionObserver } from 'hooks/useIntersectionObserver'

import styles from './LazyCover.module.css'

type Props = {
  className?: string
  image: SpotifyApi.ImageObject
  size: 'xs' | 's' | 'm' | 'l'
}

export const LazyCover = ({ className, image, size }: Props) => {
  const [loaded, setLoaded] = useState(false)
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)

  const observer = useIntersectionObserver(imageRef)
  const src = observer?.isIntersecting || loaded ? image.url : undefined

  return (
    <div className={classNames(styles.wrapper, loaded && styles.loaded)}>
      <img
        alt=""
        className={classNames(className, styles.cover, styles[size])}
        onLoad={() => setLoaded(true)}
        src={src}
        ref={setImageRef}
      />
    </div>
  )
}
