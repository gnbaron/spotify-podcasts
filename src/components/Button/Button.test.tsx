import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('<Button />', () => {
  it('renders the button as <a />', () => {
    render(<Button href="https://podcasts.gnbaron.com">content</Button>)
    const link = screen.getByRole('link', { name: /content/i })
    expect(link).toHaveAttribute('href', 'https://podcasts.gnbaron.com')
  })

  it('renders the button as a <button />', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click</Button>)
    const button = screen.getByRole('button', { name: /click/i })
    userEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })

  it('renders the button disabled', () => {
    render(
      <Button disabled onClick={jest.fn()}>
        Click
      </Button>
    )
    const button = screen.getByRole('button', { name: /click/i })
    expect(button).toBeDisabled()
  })

  it('renders with a custom className', () => {
    render(
      <Button className="custom" onClick={jest.fn()}>
        Click
      </Button>
    )
    const button = screen.getByRole('button', { name: /click/i })
    expect(button).toHaveClass('custom')
  })

  it('renders the quiet variant', () => {
    render(
      <Button onClick={jest.fn()} quiet>
        Click
      </Button>
    )
    const button = screen.getByRole('button', { name: /click/i })
    expect(button).toHaveClass('quiet')
  })

  it.each([
    'xs' as const,
    's' as const,
    'm' as const,
    'l' as const,
    'xl' as const,
  ])('renders the button when size is %s', (size) => {
    const { container } = render(
      <Button onClick={jest.fn()} size={size}>
        Click
      </Button>
    )
    const wrapper = container.childNodes[0]
    expect(wrapper).toHaveClass(size)
  })
})
