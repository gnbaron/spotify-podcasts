import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { BasePage } from 'components/BasePage'
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
            <BasePage title="Following">
              <ShowList />
            </BasePage>
          </Route>
          <Route path="/episodes">
            <BasePage title="Latest"></BasePage>
          </Route>
          <Route path="*">
            <div>not found</div>
          </Route>
        </Switch>
      </main>
    </Container>
  </BrowserRouter>
)
