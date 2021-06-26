import { NextSeo } from 'next-seo'
import { Link } from 'react-router-dom'
import { BasePage } from 'components/BasePage'
import { LazyCover } from 'components/LazyCover'

import styles from './DetailsPage.module.css'

type Props = {
  children?: React.ReactNode
  cover: SpotifyApi.ImageObject
  headingContent?: React.ReactNode
  subtitle: string
  subtitleHref?: string
  title: string
}

export const DetailsPage = (props: Props) => (
  <BasePage>
    <NextSeo title={`Spotify Podcasts · ${props.title}`} />
    <article className={styles.details}>
      <header className={styles.header}>
        <LazyCover image={props.cover} size="l" />
        <div className={styles.heading}>
          <h2 className={styles.title}>{props.title}</h2>
          {props.subtitleHref ? (
            <Link to={props.subtitleHref}>
              <h3 className={styles.subtitle}>{props.subtitle}</h3>
            </Link>
          ) : (
            <h3 className={styles.subtitle}>{props.subtitle}</h3>
          )}
          <div className={styles.content}>{props.headingContent}</div>
        </div>
      </header>
      {props.children && (
        <section className={styles.body}>
          <hr />
          {props.children}
        </section>
      )}
    </article>
  </BasePage>
)
