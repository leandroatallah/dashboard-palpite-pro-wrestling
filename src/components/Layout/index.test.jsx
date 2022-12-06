import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/authContext'

import Layout from '.'

const wrapper = ({ children }) => (
  <AuthProvider>
    <BrowserRouter>{children}</BrowserRouter>
  </AuthProvider>
)

describe('Layout', () => {
  it('should render with children', () => {
    const { getByText } = render(<Layout><div>content</div></Layout>, { wrapper })
    expect(getByText(/content/)).toBeInTheDocument()
  })
})
