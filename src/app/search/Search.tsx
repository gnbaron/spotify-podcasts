import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import classNames from 'classnames'
import { useIsFetching } from 'react-query'
import { queryKeys } from 'queries/spotify-queries'
import { BasePage } from 'components/BasePage'
import { SearchBar } from 'components/SearchBar'
import { SearchResultType } from 'types/common'
import { ResultsPanel, SearchTabs } from './SearchTabs'
import { EpisodeResults } from './EpisodeResults'
import { ShowResults } from './ShowResults'

import styles from './Search.module.css'

export const Search = () => {
  const history = useHistory()
  const params = new URLSearchParams(useLocation().search)
  const initialState = {
    query: params.get('query'),
    type: params.get('type') as SearchResultType | null,
  }

  const [query, setQuery] = useState(initialState.query || '')
  const [type, setType] = useState(initialState.type || 'show')
  const [active, setActive] = useState(!!query)

  const isFetching = useIsFetching(queryKeys.search(query, type)) > 0

  useEffect(() => {
    if (isFetching) setActive(true)
  }, [isFetching])

  useEffect(() => {
    history.replace(`/search?query=${encodeURIComponent(query)}&type=${type}`)
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
        <nav
          aria-hidden={!active}
          className={classNames(styles.nav, active && styles.active)}
        >
          <SearchTabs onSelected={setType} selected={type} />
        </nav>
        {type === 'show' && (
          <ResultsPanel hidden={!active} type="show">
            <ShowResults query={query} />
          </ResultsPanel>
        )}
        {type === 'episode' && (
          <ResultsPanel hidden={!active} type="episode">
            <EpisodeResults query={query} />
          </ResultsPanel>
        )}
      </section>
    </BasePage>
  )
}
