import { Container } from 'components/Container'
import { NavBar } from 'components/NavBar'
import { ShowList } from 'components/ShowList'

import styles from './index.module.css'

export const App = () => {
  return (
    <Container className={styles.app}>
      <header>
        <NavBar />
      </header>
      <main>
        <ShowList />
      </main>
    </Container>
  )
}
