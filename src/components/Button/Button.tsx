import classNames from 'classnames'

import styles from './Button.module.css'

type CommonProps = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  label?: string
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
}

type ButtonProps =
  | { href: string; onClick?: never }
  | { href?: never; onClick: React.MouseEventHandler<HTMLButtonElement> }

type Variant = 'primary' | 'secondary' | 'icon'

export const Button = (
  props: CommonProps & ButtonProps & { variant: Variant }
) => {
  const {
    children,
    disabled,
    href,
    label,
    onClick,
    variant,
    size = 'm',
  } = props

  const className = classNames(styles.button, styles[variant], props.className)

  const element = href ? (
    <a
      aria-label={label}
      aria-disabled={disabled}
      className={className}
      href={href}
    >
      <span className={styles.highlight} />
      {children}
    </a>
  ) : (
    <button
      aria-label={label}
      aria-disabled={disabled}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={styles.highlight} />
      {children}
    </button>
  )

  return (
    <div className={classNames(styles.wrapper, styles[size])}>{element}</div>
  )
}

export const PrimaryButton = (props: CommonProps & ButtonProps) => (
  <Button {...props} variant="primary" />
)

export const SecondaryButton = (props: CommonProps & ButtonProps) => (
  <Button {...props} variant="secondary" />
)

export const IconButton = (props: CommonProps & ButtonProps) => (
  <Button {...props} variant="icon" />
)
