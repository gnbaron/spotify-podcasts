import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'
import classNames from 'classnames'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { IconButton } from 'components/Button'

import styles from './SearchBar.module.css'

type Props = {
  className?: string
  onSearch: (value: string) => void
  query: string
}

export const SearchBar = ({ className, onSearch, query }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(query)
  const [debouncedValue] = useDebounce(value, 500)

  useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  const isEmpty = !value?.length

  const handleButtonClick = () => {
    if (!isEmpty) {
      setValue('')
    }
    inputRef.current && inputRef.current.focus()
  }

  return (
    <div className={classNames(styles.bar, className)}>
      <input
        autoCapitalize="off"
        autoCorrect="off"
        className={styles.input}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Shows and episodes"
        value={value || ''}
        ref={inputRef}
        spellCheck={false}
      />
      <IconButton
        className={styles.button}
        label={isEmpty ? 'Search' : 'Clear'}
        onClick={handleButtonClick}
        quiet
        size="l"
      >
        {isEmpty ? <FaSearch /> : <FaTimes />}
      </IconButton>
    </div>
  )
}
