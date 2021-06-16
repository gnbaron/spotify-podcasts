import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useIsFetching } from 'react-query'
import { queryKeys } from 'lib/spotify-queries'
import { BasePage } from 'components/BasePage'
import { SearchBar } from 'components/SearchBar'
import { EpisodeResults } from './EpisodeResults'
import { ShowResults } from './ShowResults'

import styles from './SearchPage.module.css'

export const SearchPage = () => {
  const [active, setActive] = useState(false)
  const [query, setQuery] = useState('')
  const [type, setType] = useState<'show' | 'episode'>('show')

  const isFetching = useIsFetching(queryKeys.search(query, type)) > 0

  useEffect(() => {
    if (isFetching) setActive(true)
  }, [isFetching])

  return (
    <BasePage>
      <header className={classNames(styles.header, active && styles.active)}>
        <SearchBar onSearch={setQuery} />
      </header>
      <section className={styles.results}>
        <nav className={classNames(styles.nav, active && styles.active)}>
          <ul className={styles.menu}>
            <li data-active={type === 'show'} onClick={() => setType('show')}>
              Shows
            </li>
            <li
              data-active={type === 'episode'}
              onClick={() => setType('episode')}
            >
              Episodes
            </li>
          </ul>
        </nav>
        {type === 'show' && <ShowResults query={query} />}
        {type === 'episode' && <EpisodeResults query={query} />}
      </section>
    </BasePage>
  )
}
