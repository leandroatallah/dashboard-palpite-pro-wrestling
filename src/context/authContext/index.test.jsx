import { describe, it } from 'vitest'
import { render } from '@testing-library/react'

import { AuthProvider } from '.'

describe('AuthProvider', () => {
    it('should render with children', () => {
        const { container } = render(<AuthProvider><div>content</div></AuthProvider>)
        expect(container).toBeInTheDocument()
    })
})