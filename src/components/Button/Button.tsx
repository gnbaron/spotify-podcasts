import { forwardRef } from 'react'
import classNames from 'classnames'

import styles from './Button.module.css'

type CommonProps = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  label?: string
  quiet?: boolean
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
}

type ButtonProps =
  | { href: string; onClick?: never }
  | { href?: never; onClick: React.MouseEventHandler<HTMLButtonElement> }

type Props = CommonProps & ButtonProps

const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, Props>(
  (props, ref) => {
    const {
      children,
      disabled,
      href,
      label,
      onClick,
      quiet,
      size = 'm',
    } = props

    const className = classNames(
      styles.button,
      quiet && styles.quiet,
      props.className
    )

    const element = href ? (
      <a
        aria-label={label}
        aria-disabled={disabled}
        className={className}
        href={href}
        ref={ref}
      >
        {children}
      </a>
    ) : (
      <button
        aria-label={label}
        aria-disabled={disabled}
        disabled={disabled}
        className={className}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    )

    return (
      <div className={classNames(styles.wrapper, styles[size])}>{element}</div>
    )
  }
)

Button.displayName = 'Button'

export { Button }
