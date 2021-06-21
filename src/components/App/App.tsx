import { Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { EpisodeDetailsPage, ShowDetailsPage } from 'components/DetailsPage'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { Loading } from 'components/Loading'
import { NavBar } from 'components/NavBar'
import { SavedEpisodesPage } from 'components/SavedEpisodesPage'
import { SavedShowsPage } from 'components/SavedShowsPage'
import { SearchPage } from 'components/SearchPage'

import styles from './App.module.css'

export const App = () => (
  <BrowserRouter>
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
                <SavedShowsPage />
              </Route>
              <Route exact path="/shows/:showId">
                <ShowDetailsPage />
              </Route>
              <Route exact path="/episodes/:episodeId">
                <EpisodeDetailsPage />
              </Route>
              <Route exact path="/library">
                <SavedEpisodesPage />
              </Route>
              <Route exact path="/search">
                <SearchPage />
              </Route>
              <Route path="*">
                <div>not found</div>
              </Route>
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  </BrowserRouter>
)
