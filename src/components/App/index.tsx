import { NavBar } from 'components/NavBar'
import { ShowList } from 'components/ShowList'

import styles from './index.module.css'

export const App = () => {
  return (
    <div className={styles.container}>
      <header>
        <NavBar />
      </header>
      <main>
        <ShowList />
      </main>
    </div>
  )
}
