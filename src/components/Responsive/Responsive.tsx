import { ReactNode } from 'react'
import { useIsWideScreen } from 'hooks/useMediaQuery'

type Props = {
  children: ReactNode
}

export const OnlySmallScreen = ({ children }: Props) =>
  useIsWideScreen() ? null : <>{children}</>

export const OnlyWideScreen = ({ children }: Props) =>
  useIsWideScreen() ? <>{children}</> : null
