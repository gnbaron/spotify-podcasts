import { Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { NavBar } from 'components/NavBar'
import { Loading } from 'components/Loading'
import { EpisodeDetails, SavedShows, ShowDetails } from 'components/Page'

import styles from './App.module.css'

export const App = () => (
  <BrowserRouter>
    <div className={styles.container}>
      <header>
        <NavBar />
      </header>
      <main>
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
            <Route exact path="/episodes/:episodeId">
              <EpisodeDetails />
            </Route>
            <Route path="*">
              <div>not found</div>
            </Route>
          </Switch>
        </Suspense>
      </main>
    </div>
  </BrowserRouter>
)
