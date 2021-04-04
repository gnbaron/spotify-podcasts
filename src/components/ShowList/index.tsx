import { useSavedShows } from 'lib/spotify-queries'

export const ShowList = () => {
  const result = useSavedShows()
  console.log(result)
  return null
}
