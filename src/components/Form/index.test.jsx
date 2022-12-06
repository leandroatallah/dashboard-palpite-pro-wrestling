import { describe, it } from 'vitest'
import { render } from '@testing-library/react'

import { Input, Button } from '.'

describe('Input', () => {
  it('should render without error', () => {
    const { container } = render(<Input />)
    expect(container.querySelector('.border-red-800')).not.toBeInTheDocument()
  })

  it('should render with error', () => {
    const errorText = "Houve um erro"
    const { container, getByText } = render(<Input isError errorText={errorText} />)

    expect(getByText(errorText)).toBeInTheDocument()
    expect(container.querySelector('.border-red-800')).toBeInTheDocument()
  })
})

describe('Button', () => {
  it('should render with children', () => {
    const { getByText } = render(<Button>content</Button>)

    expect(getByText(/content/)).toBeInTheDocument()
  })

  it('should render with loading state', () => {
    const { getByRole, getByAltText } = render(<Button loading />)

    expect(getByRole("button")).toBeDisabled()
    expect(getByAltText(/loading/)).toBeInTheDocument()
  })
})
