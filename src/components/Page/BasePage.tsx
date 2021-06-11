import styles from './BasePage.module.css'

type Props = {
  children?: React.ReactNode
  heading?: string
}

export const BasePage = ({ children, heading }: Props) => (
  <div className={styles.page}>
    {heading && (
      <header className={styles.header}>
        <h2>{heading}</h2>
        <hr />
      </header>
    )}
    <section className={styles.content}>{children}</section>
  </div>
)
