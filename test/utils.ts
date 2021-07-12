import { useIntersectionObserver } from 'hooks/useIntersectionObserver'
import { useIsWideScreen } from 'hooks/useMediaQuery'

export * as factory from './factory'
export * from './api-helpers'
export * from './query-helpers'
export * from './react-helpers'

/**
 * Cast a function mocked by `jest.mock` to `jest.Mock` type.
 */
export function asMock<T>(unmocked: T) {
  return unmocked as T & jest.Mock
}

/**
 * Mock `useIsWideScreen` hook to simulate 'small' or 'wide' screen size.
 */
export function mockScreenSize(size: 'small' | 'wide') {
  asMock(useIsWideScreen).mockReturnValue(size === 'wide')
}

/**
 * Mock Intersection Observer hook as jsdom does not implement the API.
 */
export function mockIntersectionObserver(
  entry: Partial<IntersectionObserverEntry>
) {
  asMock(useIntersectionObserver).mockReturnValue(entry)
}
