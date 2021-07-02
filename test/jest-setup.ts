import '@testing-library/jest-dom'
import { mockScreenSize } from './utils'

mockScreenSize('small')

Object.defineProperty(window, 'fetch', { value: require('node-fetch') })

jest.mock('next/router', () => require('next-router-mock'))
