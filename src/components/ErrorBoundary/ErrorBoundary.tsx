import { QueryErrorResetBoundary } from 'react-query'
import { ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { Button } from 'components/Button'

import styles from './ErrorBoundary.module.css'

type Props = {
  children: ReactNode
}

export const ErrorBoundary = ({ children }: Props) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <div className={styles.error}>
              <h2 className={styles.heading}>
                Oh snap! Something went wrong <span>😱</span>
              </h2>
              <Button
                className={styles.button}
                onClick={() => resetErrorBoundary()}
                quiet
              >
                Try again
              </Button>
            </div>
          )}
          onReset={reset}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
