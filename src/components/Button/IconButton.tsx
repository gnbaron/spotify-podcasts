import classNames from 'classnames'
import { Button } from './Button'

import styles from './IconButton.module.css'

type Props = React.ComponentProps<typeof Button> & { label: string }

export const IconButton = ({ label, ...props }: Props) => (
  <Button
    {...props}
    className={classNames(props.className, styles.iconButton)}
    label={label}
  />
)
