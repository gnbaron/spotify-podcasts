import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import classNames from 'classnames'
import { useIsFetching } from 'react-query'
import { queryKeys } from 'lib/spotify-queries'
import { BasePage } from 'components/BasePage'
import { SearchBar } from 'components/SearchBar'
import { EpisodeResults } from './EpisodeResults'
import { ShowResults } from './ShowResults'

import styles from './SearchPage.module.css'

type ResultType = 'show' | 'episode'

export const SearchPage = () => {
  const history = useHistory()
  const params = new URLSearchParams(useLocation().search)
  const initialState = {
    query: params.get('query'),
    type: params.get('type') as ResultType | null,
  }

  const [query, setQuery] = useState(initialState.query || '')
  const [type, setType] = useState(initialState.type || 'show')
  const [active, setActive] = useState(!!query)

  const isFetching = useIsFetching(queryKeys.search(query, type)) > 0

  useEffect(() => {
    if (isFetching) setActive(true)
  }, [isFetching])

  useEffect(() => {
    history.push(`/search?query=${encodeURIComponent(query)}&type=${type}`)
    if (query.length === 0) {
      setActive(false)
    }
  }, [history, query, type])

  return (
    <BasePage>
      <header className={classNames(styles.header, active && styles.active)}>
        <h2 className={styles.title}>Search for shows and episodes</h2>
        <SearchBar
          className={styles.searchBar}
          onSearch={setQuery}
          query={query}
        />
      </header>
      <section className={classNames(styles.results, active && styles.active)}>
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
