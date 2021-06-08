import { NextSeo } from 'next-seo'
import { EmptyState } from 'components/EmptyState'
import { BasePage } from './BasePage'

// import styles from './SavedEpisodes.module.css'

export const SavedEpisodes = () => {
  return (
    <BasePage heading="Library">
      <NextSeo
        title="Spotify Podcasts · Library"
        description="List of saved episodes."
      />
      <EmptyState subtitle="It looks like you didn't save any episode yet." />
    </BasePage>
  )
}
