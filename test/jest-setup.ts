import '@testing-library/jest-dom'
import { mockIntersectionObserver, mockScreenSize } from './utils'

Object.defineProperty(window, 'fetch', { value: require('node-fetch') })

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('../public/img/icon.png', () => ({
  height: 709,
  src: '/public/img/icon.png',
  width: 709,
}))

mockIntersectionObserver({ isIntersecting: true })

mockScreenSize('small')
