import { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { Loading } from 'components/Loading'
import { NavBar } from 'components/NavBar'
import { EpisodeDetails, SavedEpisodes } from 'app/episode'
import { ShowDetails, SavedShows } from 'app/show'
import { Search } from 'app/search'

import styles from './App.module.css'

export const App = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <NavBar />
    </header>
    <main className={styles.main}>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/shows" />
            </Route>
            <Route exact path="/shows">
              <SavedShows />
            </Route>
            <Route exact path="/shows/:showId">
              <ShowDetails />
            </Route>
            <Route exact path="/episodes">
              <SavedEpisodes />
            </Route>
            <Route exact path="/episodes/:episodeId">
              <EpisodeDetails />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route path="*">
              <div>not found</div>
            </Route>
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </main>
  </div>
)
