import {
  clearSpotifyAPIMocks,
  mockIntersectionObserver,
  mockScreenSize,
} from './utils'

/**
 * Add custom jest matchers for DOM nodes.
 * @see https://github.com/testing-library/jest-dom
 */
import '@testing-library/jest-dom'

/**
 * Add fetch implementation so we can let requests actually go through it.
 */
Object.defineProperty(window, 'fetch', { value: require('node-fetch') })

/**
 * Replace Next.js router with in memory implementation.
 */
jest.mock('next/router', () => require('next-router-mock'))

/**
 * Mock assets being imported as es modules.
 */
jest.mock('../public/img/icon.png', () => ({
  height: 709,
  src: '/public/img/icon.png',
  width: 709,
}))

jest.mock('hooks/useMediaQuery')
jest.mock('hooks/useIntersectionObserver')

beforeEach(() => {
  mockIntersectionObserver({ isIntersecting: true })
  mockScreenSize('small')
})

afterEach(() => clearSpotifyAPIMocks())
