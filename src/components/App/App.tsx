import { Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { NavBar } from 'components/NavBar'
import { Loading } from 'components/Loading'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { EpisodeDetailsPage } from 'components/EpisodeDetailsPage'
import { SavedEpisodesPage } from 'components/SavedEpisodesPage'
import { SavedShowsPage } from 'components/SavedShowsPage'
import { SearchPage } from 'components/SearchPage'
import { ShowDetailsPage } from 'components/ShowDetailsPage'

import styles from './App.module.css'

export const App = () => (
  <BrowserRouter>
    <div className={styles.container}>
      <header>
        <NavBar />
      </header>
      <main>
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
              <Route exact path="/shows/:showId/episodes/:episodeId">
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
