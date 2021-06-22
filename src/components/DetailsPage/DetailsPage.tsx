import { NextSeo } from 'next-seo'
import { Link } from 'react-router-dom'
import { useIsWideScreen } from 'utils/use-media-query'
import { BasePage } from 'components/BasePage'
import { Cover } from 'components/Cover'

import styles from './DetailsPage.module.css'

type Props = {
  children?: React.ReactNode
  cover: SpotifyApi.ImageObject
  headingContent?: React.ReactNode
  subtitle: string
  subtitleHref?: string
  title: string
}

export const DetailsPage = (props: Props) => {
  const { cover, headingContent, subtitle, subtitleHref, title } = props
  const isWide = useIsWideScreen()
  return (
    <BasePage>
      <NextSeo title={`Spotify Podcasts · ${title}`} />
      <article className={styles.details}>
        <header className={styles.header}>
          <Cover image={cover} size={isWide ? 'l' : 'xl'} />
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
        {props.children && (
          <section className={styles.body}>
            <hr />
            {props.children}
          </section>
        )}
      </article>
    </BasePage>
  )
}
