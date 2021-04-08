import { ShowList } from 'components/ShowList'

import styles from './index.module.css'

export const App = () => {
  return (
    <main className={styles.main}>
      <ShowList />
    </main>
  )
}
