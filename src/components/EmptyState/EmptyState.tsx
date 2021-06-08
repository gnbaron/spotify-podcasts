import styles from './EmptyState.module.css'

type Props = {
  title?: string
  subtitle?: string
}

export const EmptyState = ({
  title = 'Oh snap! Nothing to see here.',
  subtitle,
}: Props) => {
  return (
    <div className={styles.emptyState}>
      <h3 className={styles.title}>{title}</h3>
      <img className={styles.illustration} src="/img/empty-box.svg" />
      {subtitle && <h4 className={styles.subtitle}>{subtitle}</h4>}
    </div>
  )
}
