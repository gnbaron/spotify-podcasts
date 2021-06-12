import { LoadingSpinner } from 'components/Loading'

import styles from './BasePage.module.css'

type Props = {
  children?: React.ReactNode
  heading?: string
  isLoading?: boolean
}

export const BasePage = ({ children, heading, isLoading }: Props) => (
  <div className={styles.page}>
    {heading && (
      <header className={styles.header}>
        <div className={styles.heading}>
          <h2>{heading}</h2>
          {isLoading && <LoadingSpinner />}
        </div>
        <hr />
      </header>
    )}
    <section className={styles.content}>{children}</section>
  </div>
)
