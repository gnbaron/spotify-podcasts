import { forwardRef } from 'react'
import Link from 'next/link'
import classnames from 'classnames'

import styles from './index.module.css'

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
        <Link href={href}>
          <a
            aria-disabled={disabled}
            className={classnames(
              styles.wrapper,
              styles.link,
              quiet && styles.quiet,
              className
            )}
            ref={ref}
          >
            {children}
          </a>
        </Link>
      )
    }

    return (
      <button
        aria-disabled={disabled || undefined}
        disabled={disabled}
        className={classnames(
          styles.wrapper,
          styles.button,
          quiet && styles.quiet,
          className
        )}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
