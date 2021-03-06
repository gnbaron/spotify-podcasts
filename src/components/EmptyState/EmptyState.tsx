import classNames from 'classnames'

import styles from './EmptyState.module.css'

type Props = {
  size?: 's' | 'm' | 'l'
  subtitle?: string
  subtitleAs?: 'h1' | 'h2' | 'h3' | 'h4'
  title?: string
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4'
}

export const EmptyState = ({
  size = 'm',
  subtitle,
  subtitleAs: SubHeading = 'h4',
  title,
  titleAs: Heading = 'h3',
}: Props) => (
  <div className={classNames(styles.emptyState, styles[size])}>
    {title && <Heading className={styles.title}>{title}</Heading>}
    <img
      alt="Person looking into empty box."
      className={styles.illustration}
      src="/img/empty.svg"
    />
    {subtitle && (
      <SubHeading className={styles.subtitle}>{subtitle}</SubHeading>
    )}
  </div>
)
