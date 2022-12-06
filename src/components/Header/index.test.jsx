import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import { AuthProvider } from '../../context/authContext'
import { BrowserRouter } from 'react-router-dom'

import Header from '.'

const wrapper = ({ children }) => (
  <AuthProvider>
    <BrowserRouter>{children}</BrowserRouter>
  </AuthProvider>
)

describe('Header', () => {
  it('should render component', () => {
    const { container } = render(<Header />, { wrapper })

    expect(container).toBeInTheDocument()
  })
})