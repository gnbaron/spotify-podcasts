import { screen } from '@testing-library/react'
import { mockScreenSize, render } from 'test/utils'
import { OnlySmallScreen, OnlyWideScreen } from './Responsive'

describe('<OnlySmallScreen />', () => {
  it('renders content when screen size is small', () => {
    mockScreenSize('small')
    render(<OnlySmallScreen>content</OnlySmallScreen>)
    screen.getByText(/content/i)
  })

  it('does not render content when screen size is wide', () => {
    mockScreenSize('wide')
    render(<OnlySmallScreen>content</OnlySmallScreen>)
    expect(screen.queryByText(/content/i)).toBeNull()
  })
})

describe('<OnlyWideScreen />', () => {
  it('renders content when screen size is wide', () => {
    mockScreenSize('wide')
    render(<OnlyWideScreen>content</OnlyWideScreen>)
    screen.getByText(/content/i)
  })

  it('does not render content when screen size is small', () => {
    mockScreenSize('small')
    render(<OnlyWideScreen>content</OnlyWideScreen>)
    expect(screen.queryByText(/content/i)).toBeNull()
  })
})
