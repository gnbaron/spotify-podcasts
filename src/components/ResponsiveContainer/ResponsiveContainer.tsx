import { ReactNode } from 'react'
import { useIsWideScreen } from 'utils/use-media-query'

export const OnlySmallScreen = ({ children }: { children: ReactNode }) =>
  useIsWideScreen() ? null : <>{children}</>

export const OnlyWideScreen = ({ children }: { children: ReactNode }) =>
  useIsWideScreen() ? <>{children}</> : null
