import '@testing-library/jest-dom'
import { mockIntersectionObserver, mockScreenSize } from './utils'

Object.defineProperty(window, 'fetch', { value: require('node-fetch') })

jest.mock('next/router', () => require('next-router-mock'))

mockIntersectionObserver({ isIntersecting: true })

mockScreenSize('small')
