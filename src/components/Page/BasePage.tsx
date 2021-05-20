import styles from './BasePage.module.css'

type Props = {
  children?: React.ReactNode
  heading?: string
}

export const BasePage = ({ children, heading }: Props) => {
  return (
    <div className={styles.container}>
      {heading && (
        <>
          <h2 className={styles.heading}>{heading}</h2>
          <hr />
        </>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  )
}
