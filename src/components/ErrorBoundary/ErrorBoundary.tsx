import { QueryErrorResetBoundary } from 'react-query'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { BasePage } from 'components/BasePage'
import { Button } from 'components/Button'

import styles from './ErrorBoundary.module.css'

type Props = {
  children: React.ReactNode
}

export const ErrorBoundary = ({ children }: Props) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <BasePage>
              <div className={styles.error}>
                <h2 className={styles.heading}>
                  Oh snap! Something went wrong.
                </h2>
                <img className={styles.illustration} src="/img/injured.svg" />
                <Button
                  className={styles.button}
                  onClick={() => resetErrorBoundary()}
                  quiet
                >
                  Try again
                </Button>
              </div>
            </BasePage>
          )}
          onReset={reset}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
