import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Container } from 'components/Container'
import { NavBar } from 'components/NavBar'
import { ShowList } from 'components/ShowList'

import styles from './index.module.css'

export const App = () => (
  <BrowserRouter>
    <Container className={styles.app}>
      <header>
        <NavBar />
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to="/latest" />
          </Route>
          <Route path="/latest">
            <div>new episodes</div>
          </Route>
          <Route exact path="/shows">
            <ShowList />
          </Route>
          <Route path="*">
            <div>not found</div>
          </Route>
        </Switch>
      </main>
    </Container>
  </BrowserRouter>
)
