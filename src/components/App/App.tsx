import { Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { NavBar } from 'components/NavBar'
import { Loading } from 'components/Loading'
import { ErrorBoundary } from 'components/ErrorBoundary'
import {
  SavedShows,
  SavedEpisodes,
  ShowDetails,
  EpisodeDetails,
} from 'components/Page'

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
                <SavedShows />
              </Route>
              <Route exact path="/shows/:showId">
                <ShowDetails />
              </Route>
              <Route exact path="/shows/:showId/episodes/:episodeId">
                <EpisodeDetails />
              </Route>
              <Route exact path="/library">
                <SavedEpisodes />
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
