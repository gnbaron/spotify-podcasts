import { ReactNode } from 'react'
import { useIsWideScreen } from 'hooks/useMediaQuery'

export const OnlySmallScreen = ({ children }: { children: ReactNode }) =>
  useIsWideScreen() ? null : <>{children}</>

export const OnlyWideScreen = ({ children }: { children: ReactNode }) =>
  useIsWideScreen() ? <>{children}</> : null
