import { ReactNode } from 'react'
import { NextSeo } from 'next-seo'
import { Cover } from 'components/Cover'
import { BasePage } from './BasePage'

import styles from './BaseDetailsPage.module.css'

type Props = {
  children?: ReactNode
  cover: SpotifyApi.ImageObject
  coverSize?: 's' | 'm' | 'l'
  headingContent?: ReactNode
  subtitle: string
  title: string
}

export const BaseDetailsPage = (props: Props) => {
  const {
    children,
    cover,
    coverSize = 'l',
    headingContent,
    subtitle,
    title,
  } = props

  return (
    <BasePage>
      <NextSeo title={`Spotify Podcasts · ${title}`} />
      <article className={styles.details}>
        <header>
          <Cover image={cover} size={coverSize} />
          <div className={styles.heading}>
            <h2>{title}</h2>
            <span>{subtitle}</span>
            <div className={styles.content}>{headingContent}</div>
          </div>
        </header>
        {children && (
          <section className={styles.body}>
            <hr />
            {children}
          </section>
        )}
      </article>
    </BasePage>
  )
}
