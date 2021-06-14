import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { FaSearch } from 'react-icons/fa'
import { IconButton } from 'components/Button'
import { LoadingSpinner } from 'components/Loading'

import styles from './SearchBar.module.css'

type Props = {
  isSearching?: boolean
  onSearch: (value: string) => void
}

export const SearchBar = ({ isSearching, onSearch }: Props) => {
  const [value, setValue] = useState<string | null>(null)
  const [debouncedValue] = useDebounce(value, 400)

  useEffect(() => {
    if (debouncedValue) onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  return (
    <div className={styles.bar}>
      <input
        className={styles.input}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Shows and episodes"
        value={value || ''}
      />
      <IconButton
        className={styles.button}
        onClick={() => value && onSearch(value)}
        quiet
        size="l"
      >
        {isSearching ? <LoadingSpinner /> : <FaSearch />}
      </IconButton>
    </div>
  )
}
