import { Container } from 'components/Container'

import styles from './BasePage.module.css'

type Props = {
  children?: React.ReactNode
  title: string
}

export const BasePage = ({ children, title }: Props) => {
  return (
    <Container className={styles.wrapper}>
      <h2>{title}</h2>
      <hr />
      <div className={styles.content}>{children}</div>
    </Container>
  )
}
