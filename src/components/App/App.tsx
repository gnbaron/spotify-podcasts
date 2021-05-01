import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Container } from 'components/Container'
import { NavBar } from 'components/NavBar'
import { ShowList } from 'components/ShowList'

import styles from './App.module.css'

export const App = () => (
  <BrowserRouter>
    <Container className={styles.app}>
      <header>
        <NavBar />
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to="/shows" />
          </Route>
          <Route exact path="/shows">
            <ShowList />
          </Route>
          <Route path="/episodes">
            <div>new episodes</div>
          </Route>
          <Route path="*">
            <div>not found</div>
          </Route>
        </Switch>
      </main>
    </Container>
  </BrowserRouter>
)
