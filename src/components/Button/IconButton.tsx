import classNames from 'classnames'
import { Button } from './Button'

import styles from './IconButton.module.css'

type Props = React.ComponentProps<typeof Button>

export const IconButton = (props: Props) => {
  return (
    <Button
      {...props}
      className={classNames(props.className, styles.iconButton)}
    >
      {props.children}
    </Button>
  )
}
