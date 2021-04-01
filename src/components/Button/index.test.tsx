import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './index'

describe('<Button />', () => {
  it('renders as a link', () => {
    render(<Button href="https://some.url.io">content</Button>)
    const link = screen.getByRole('link', { name: /content/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://some.url.io')
  })

  it('renders as a button', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>content</Button>)
    const button = screen.getByRole('button', { name: /content/i })
    expect(button).toBeInTheDocument()
    userEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })

  it('renders the button disabled', () => {
    render(
      <Button disabled onClick={jest.fn()}>
        Content
      </Button>
    )
    const button = screen.getByRole('button', { name: /content/i })
    expect(button).toBeDisabled()
  })

  it('renders with a custom className', () => {
    render(
      <Button className="custom" onClick={jest.fn()}>
        Content
      </Button>
    )
    const button = screen.getByRole('button', { name: /content/i })
    expect(button).toHaveClass('custom')
  })
})
