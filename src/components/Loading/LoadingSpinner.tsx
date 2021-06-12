import classNames from 'classnames'
import { CgSpinner } from 'react-icons/cg'

import styles from './LoadingSpinner.module.css'

type Props = {
  className?: string
}

export const LoadingSpinner = ({ className }: Props) => {
  return <CgSpinner className={classNames(styles.spinner, className)} />
}
