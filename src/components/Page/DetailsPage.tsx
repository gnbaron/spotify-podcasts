import { ReactNode } from 'react'
import { CoverImage } from 'components/CoverImage'
import { BasePage } from './BasePage'

import styles from './DetailsPage.module.css'

type Props = {
  children?: ReactNode
  cover: SpotifyApi.ImageObject[]
  coverSize?: 's' | 'm' | 'l'
  description?: string
  subtitle: string
  title: string
}

export const DetailsPage = (props: Props) => {
  const {
    children,
    cover,
    coverSize = 'l',
    description,
    subtitle,
    title,
  } = props

  return (
    <BasePage>
      <article className={styles.details}>
        <header>
          <CoverImage images={cover} size={coverSize} />
          <div className={styles.heading}>
            <h2>{title}</h2>
            <span>{subtitle}</span>
            {description && <p>{description}</p>}
          </div>
        </header>
        {children && (
          <section className={styles.content}>
            <hr />
            {children}
          </section>
        )}
      </article>
    </BasePage>
  )
}
