import { NextSeo } from 'next-seo'
import { BasePage } from 'components/BasePage'
import { Cover } from 'components/Cover'

import styles from './DetailsPage.module.css'

type Props = {
  children?: React.ReactNode
  cover: SpotifyApi.ImageObject
  coverSize?: 's' | 'm' | 'l'
  headingContent?: React.ReactNode
  subtitle: string
  title: string
}

export const DetailsPage = (props: Props) => {
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
