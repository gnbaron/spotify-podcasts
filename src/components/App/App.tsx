import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { BasePage } from 'components/BasePage'
import { NavBar } from 'components/NavBar'
import { ShowList, ShowDetails } from 'components/Show'

import styles from './App.module.css'

export const App = () => (
  <BrowserRouter>
    <div className={styles.container}>
      <header>
        <NavBar />
      </header>
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to="/shows" />
          </Route>
          <Route exact path="/shows">
            <BasePage heading="Following">
              <ShowList />
            </BasePage>
          </Route>
          <Route exact path="/shows/:id">
            <BasePage>
              <ShowDetails />
            </BasePage>
          </Route>
          <Route path="/latest">
            <BasePage heading="Latest">
              <div>latest releases</div>
            </BasePage>
          </Route>
          <Route path="*">
            <div>not found</div>
          </Route>
        </Switch>
      </main>
    </div>
  </BrowserRouter>
)
