import classNames from 'classnames'
import { ScreenReaderOnly } from 'components/ScreenReaderOnly'

import styles from './Logo.module.css'

type Props = {
  className?: string
  renderHeading?: boolean
  size?: 's' | 'm' | 'l'
}

export const Logo = ({ className, renderHeading, size = 'm' }: Props) => (
  <div className={classNames(styles.wrapper, styles[size], className)}>
    <img alt="" className={styles.icon} src="/img/icon.png" />
    {renderHeading ? (
      <h1 className={styles.heading}>Podcasts</h1>
    ) : (
      <ScreenReaderOnly>
        <h1>Spotify Podcasts</h1>
      </ScreenReaderOnly>
    )}
  </div>
)
