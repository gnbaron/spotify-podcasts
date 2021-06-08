import { forwardRef } from 'react'
import classNames from 'classnames'

import styles from './Button.module.css'

type Props = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  quiet?: boolean
}

const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, Props>(
  (props, ref) => {
    const { children, className, disabled, href, onClick, quiet } = props

    if (href) {
      return (
        <div className={classNames(styles.wrapper, className)}>
          <a
            aria-disabled={disabled}
            className={classNames(styles.button, quiet && styles.quiet)}
            href={href}
            ref={ref}
          >
            {children}
          </a>
        </div>
      )
    }

    return (
      <div className={classNames(styles.wrapper, className)}>
        <button
          aria-disabled={disabled}
          disabled={disabled}
          className={classNames(styles.button, quiet && styles.quiet)}
          onClick={onClick}
          ref={ref}
        >
          {children}
        </button>
      </div>
    )
  }
)

Button.displayName = 'Button'

export { Button }
