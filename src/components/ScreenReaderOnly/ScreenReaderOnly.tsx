import styles from './ScreenReaderOnly.module.css'

type Props = {
  children?: React.ReactNode
}

export const ScreenReaderOnly = ({ children }: Props) => (
  <div className={styles.hidden}>{children}</div>
)
