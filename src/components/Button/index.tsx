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

export const Button = (props: Props) => {
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
    >
      {children}
    </button>
  )
}
