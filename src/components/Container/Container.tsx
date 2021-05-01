import classNames from 'classnames'

import styles from './Container.module.css'

type Props = {
  children?: React.ReactNode
  className?: string
}

export const Container = ({ children, className }: Props) => (
  <div className={classNames(styles.container, className)}>{children}</div>
)
