import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'
import classNames from 'classnames'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { IconButton } from 'components/Button'

import styles from './SearchBar.module.css'

type Props = {
  className?: string
  onSearch: (value: string) => void
}

export const SearchBar = ({ className, onSearch }: Props) => {
  const [value, setValue] = useState<string | null>(null)
  const [debouncedValue] = useDebounce(value, 500)
  const inputRef = useRef<HTMLInputElement>(null)

  const isEmpty = !value?.length

  useEffect(() => {
    if (debouncedValue) onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  const handleButtonClick = () => {
    if (!isEmpty) {
      setValue('')
    }
    inputRef.current && inputRef.current.focus()
  }

  return (
    <div className={classNames(styles.bar, className)}>
      <input
        className={styles.input}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Shows and episodes"
        value={value || ''}
        ref={inputRef}
      />
      <IconButton
        className={styles.button}
        onClick={handleButtonClick}
        quiet
        size="l"
      >
        {isEmpty ? <FaSearch /> : <FaTimes />}
      </IconButton>
    </div>
  )
}
