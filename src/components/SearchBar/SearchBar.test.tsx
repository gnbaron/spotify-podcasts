import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from 'test/utils'
import { SearchBar } from './SearchBar'

describe('<SearchBar />', () => {
  it('triggers search when user stops typing', async () => {
    const onSearch = jest.fn()
    render(<SearchBar onSearch={onSearch} query="" />)
    onSearch.mockClear()
    userEvent.type(screen.getByRole('textbox'), 'aaaa')
    expect(onSearch).not.toHaveBeenCalled()
    await waitFor(() => expect(onSearch).toHaveBeenCalledWith('aaaa'))
  })

  it('clears the search text field', () => {
    render(<SearchBar onSearch={jest.fn()} query="aaaa" />)
    userEvent.click(screen.getByRole('button', { name: /clear/i }))
    expect(screen.getByRole('textbox')).toHaveValue('')
  })
})
