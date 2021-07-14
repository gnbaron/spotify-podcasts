import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from 'test/utils'
import { Button } from './Button'

describe.each([
  { variant: 'primary' as const },
  { variant: 'secondary' as const },
  { variant: 'icon' as const },
])('<Button ...%o />', ({ variant }) => {
  it('renders the button variant', () => {
    render(
      <Button variant={variant} onClick={jest.fn()}>
        Click
      </Button>
    )
    const button = screen.getByRole('button', { name: /click/i })
    expect(button).toHaveClass(variant)
  })

  it('renders the button as <a />', () => {
    render(
      <Button variant={variant} href="https://podcasts.gnbaron.com">
        Click
      </Button>
    )
    const link = screen.getByRole('link', { name: /click/i })
    expect(link).toHaveAttribute('href', 'https://podcasts.gnbaron.com')
  })

  it('renders the button as a <button />', () => {
    const onClick = jest.fn()
    render(
      <Button variant={variant} onClick={onClick}>
        Click
      </Button>
    )
    const button = screen.getByRole('button', { name: /click/i })
    userEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })

  it('renders the button disabled', () => {
    render(
      <Button variant={variant} disabled onClick={jest.fn()}>
        Click
      </Button>
    )
    const button = screen.getByRole('button', { name: /click/i })
    expect(button).toBeDisabled()
  })

  it('renders with a custom className', () => {
    render(
      <Button variant={variant} className="custom" onClick={jest.fn()}>
        Click
      </Button>
    )
    const button = screen.getByRole('button', { name: /click/i })
    expect(button).toHaveClass('custom')
  })

  it.each([
    'xs' as const,
    's' as const,
    'm' as const,
    'l' as const,
    'xl' as const,
  ])('renders the button when size is %s', (size) => {
    const { container } = render(
      <Button variant={variant} onClick={jest.fn()} size={size}>
        Click
      </Button>
    )
    expect(container.firstChild).toHaveClass(size)
  })
})
