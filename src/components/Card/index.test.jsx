import { describe, it } from 'vitest'
import { render } from '@testing-library/react'

import Card from '.'

describe('Card', () => {
  it('should render with children', () => {
    const { getByText } = render(<Card><div>content</div></Card>)
    expect(getByText(/content/)).toBeInTheDocument()
  })

  it('should render with aditional className', () => {
    const { container } = render(<Card className="add-class" />)
    expect(container.querySelector('.add-class')).toBeInTheDocument()
  })
})