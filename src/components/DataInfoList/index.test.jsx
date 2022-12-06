import { describe, it } from 'vitest'
import { render } from '@testing-library/react'

import DataInfoList from '.'

describe('DataInfoList', () => {
  it('should render', () => {
    const { container } = render(<DataInfoList />)
    expect(container).toBeInTheDocument()
  })
})