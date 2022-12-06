import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/authContext'

import LayoutSignin from '.'

const wrapper = ({ children }) => (
  <AuthProvider>
    <BrowserRouter>{children}</BrowserRouter>
  </AuthProvider>
)

describe('LayoutSignin', () => {
  it('should render with children', () => {
    const { getByText } = render(<LayoutSignin><div>content</div></LayoutSignin>, { wrapper })
    expect(getByText(/content/)).toBeInTheDocument()
  })

  it('should render callToAction', () => {
    const callToAction = 'call to action'
    const { getByText } = render(<LayoutSignin callToAction={callToAction} />, { wrapper })
    expect(getByText(callToAction)).toBeInTheDocument()
  })
})
