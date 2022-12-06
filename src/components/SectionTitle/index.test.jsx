import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import SectionTitle from '.'

const wrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('SectionTitle', () => {
  it('should render with children', () => {
    const { getByText } = render(<SectionTitle>content</SectionTitle>, { wrapper })
    expect(getByText(/content/)).toBeInTheDocument()
  })

  it('should render with link', () => {
    const { getByRole, getByText } = render(<SectionTitle link={{
      label: 'Eventos', href: "/events"
    }} />, { wrapper })
    expect(getByRole('link', { name: /Eventos/ })).toBeInTheDocument()
  })
})
