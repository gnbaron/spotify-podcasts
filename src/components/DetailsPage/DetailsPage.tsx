import { NextSeo } from 'next-seo'
import { BasePage } from 'components/BasePage'
import { Cover } from 'components/Cover'

import styles from './DetailsPage.module.css'
import { Link } from 'react-router-dom'

type Props = {
  children?: React.ReactNode
  cover: SpotifyApi.ImageObject
  coverSize?: 's' | 'm' | 'l'
  headingContent?: React.ReactNode
  subtitle: string
  subtitleHref?: string
  title: string
}

export const DetailsPage = (props: Props) => {
  const {
    children,
    cover,
    coverSize = 'l',
    headingContent,
    subtitle,
    subtitleHref,
    title,
  } = props

  return (
    <BasePage>
      <NextSeo title={`Spotify Podcasts · ${title}`} />
      <article className={styles.details}>
        <header>
          <Cover image={cover} size={coverSize} />
          <div className={styles.heading}>
            <h2 className={styles.title}>{title}</h2>
            {subtitleHref ? (
              <Link to={subtitleHref}>
                <h3 className={styles.subtitle}>{subtitle}</h3>
              </Link>
            ) : (
              <h3 className={styles.subtitle}>{subtitle}</h3>
            )}
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
