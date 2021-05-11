import { Container } from 'components/Container'

import styles from './BasePage.module.css'

type Props = {
  children?: React.ReactNode
  heading?: string
}

export const BasePage = ({ children, heading }: Props) => {
  return (
    <Container className={styles.wrapper}>
      {heading && (
        <>
          <h2>{heading}</h2>
          <hr />
        </>
      )}
      <div className={styles.content}>{children}</div>
    </Container>
  )
}
