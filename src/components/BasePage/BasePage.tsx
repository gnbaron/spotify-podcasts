import classNames from 'classnames'
import { OnlySmallScreen } from 'components/Responsive'

import styles from './BasePage.module.css'

type Props = {
  children?: React.ReactNode
  className?: string
  heading?: string
}

export const BasePage = ({ children, className, heading }: Props) => (
  <div className={styles.page}>
    <OnlySmallScreen>
      {heading && (
        <header className={styles.header}>
          <h2>{heading}</h2>
          <hr />
        </header>
      )}
    </OnlySmallScreen>
    <div className={classNames(styles.scroller, !heading && styles.fullpage)}>
      <section className={classNames(styles.content, className)}>
        {children}
      </section>
    </div>
  </div>
)
