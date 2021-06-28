import classNames from 'classnames'
import { CgSpinner } from 'react-icons/cg'

import styles from './Spinner.module.css'

type Props = {
  className?: string
}

export const Spinner = ({ className }: Props) => (
  <CgSpinner className={classNames(styles.spinner, className)} />
)
