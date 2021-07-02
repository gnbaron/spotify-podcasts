import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { mockScreenSize, render } from 'test/utils'
import * as factory from 'test/factory'
import router from 'next/router'
import { Profile } from './Profile'

describe('<Profile />', () => {
  it('renders the avatar', async () => {
    const { user } = render(<Profile />)
    const url = user.images && user.images[0].url
    const avatar = await screen.findByRole('presentation')
    expect(avatar).toHaveAttribute('src', url)
  })

  it('renders the placeholder when user has no profile image', async () => {
    const user = factory.user.build({ images: [] })
    render(<Profile />, { user })
    const avatar = await screen.findByRole('presentation')
    expect(avatar).toHaveAttribute('src', '/img/avatar.svg')
  })

  it('renders the logout icon button', async () => {
    render(<Profile />)
    const button = await screen.findByRole('button')
    expect(button.querySelector('svg')).not.toBeNull()
    userEvent.click(button)
    expect(router.asPath).toBe('/login')
  })

  describe('when screen size is wide', () => {
    beforeAll(() => mockScreenSize('wide'))

    it('renders the user name', async () => {
      const { user } = render(<Profile />)
      await screen.findByText(user.display_name || 'not found')
    })

    it('renders the logout button', async () => {
      render(<Profile />)
      const button = await screen.findByRole('button', { name: /logout/i })
      userEvent.click(button)
      expect(router.asPath).toBe('/login')
    })
  })
})
