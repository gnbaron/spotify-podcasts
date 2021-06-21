import { ReactNode } from 'react'

import styles from './ScreenReaderOnly.module.css'

type Props = {
  children?: ReactNode
}

export const ScreenReaderOnly = ({ children }: Props) => (
  <div className={styles.hidden}>{children}</div>
)
