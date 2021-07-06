import { render } from 'test/utils'
import { Loading } from './Loading'

describe('<Loading />', () => {
  it('renders nprogress loading bar', () => {
    render(<Loading />)
    expect(document.body.querySelector('#nprogress')).not.toBeNull()
  })
})
