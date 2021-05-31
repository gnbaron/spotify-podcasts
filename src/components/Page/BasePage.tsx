import styles from './BasePage.module.css'

type Props = {
  children?: React.ReactNode
  heading?: string
}

export const BasePage = ({ children, heading }: Props) => (
  <div className={styles.page}>
    <header className={styles.header}>
      {heading && (
        <>
          <h2>{heading}</h2>
          <hr />
        </>
      )}
    </header>
    {children}
  </div>
)
