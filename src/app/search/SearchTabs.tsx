import { SearchResultType } from 'types/common'

import styles from './SearchTabs.module.css'

type Props = {
  onSelected: (tab: SearchResultType) => void
  selected: SearchResultType
}

export const SearchTabs = ({ onSelected, selected }: Props) => (
  <div aria-label="Search results" className={styles.tabs} role="tablist">
    <a
      aria-controls="show-panel"
      aria-selected={selected === 'show'}
      id="show-tab"
      onClick={() => onSelected('show')}
      role="tab"
    >
      Shows
    </a>
    <a
      aria-controls="episode-panel"
      aria-selected={selected === 'episode'}
      id="episode-tab"
      onClick={() => onSelected('episode')}
      role="tab"
    >
      Episodes
    </a>
  </div>
)

type TabProps = {
  children: React.ReactElement
  hidden?: boolean
  type: SearchResultType
}

export const ResultsPanel = ({ children, hidden, type }: TabProps) => (
  <div
    aria-hidden={hidden}
    aria-labelledby={`${type}-tab`}
    className={styles.panel}
    id={`${type}-panel`}
    role="tabpanel"
  >
    {children}
  </div>
)
