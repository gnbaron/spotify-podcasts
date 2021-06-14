import { BasePage } from 'components/BasePage'
import { SearchBar } from 'components/SearchBar'

import styles from './SearchPage.module.css'

export const SearchPage = () => {
  return (
    <BasePage>
      <div className={styles.searchBar}>
        <SearchBar
          // isSearching
          onSearch={(term) => console.log(`searching for ${term}`)}
        />
      </div>
    </BasePage>
  )
}
