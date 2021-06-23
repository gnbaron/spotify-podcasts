import { useState } from 'react'
import classNames from 'classnames'
import { useIntersectionObserver } from 'utils/use-intersection-observer'

import styles from './Cover.module.css'

type Props = {
  className?: string
  image: SpotifyApi.ImageObject
  size: 'xs' | 's' | 'm' | 'l'
}

export const Cover = ({ className, image, size }: Props) => {
  const [loaded, setLoaded] = useState(false)
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)

  const observer = useIntersectionObserver(imageRef)
  const src = observer?.isIntersecting || loaded ? image.url : undefined

  return (
    <div className={classNames(styles.wrapper, loaded && styles.loaded)}>
      <img
        className={classNames(className, styles.cover, styles[size])}
        onLoad={() => setLoaded(true)}
        src={src}
        role="presentation"
        ref={setImageRef}
      />
    </div>
  )
}
