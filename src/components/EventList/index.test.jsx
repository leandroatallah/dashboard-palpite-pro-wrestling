import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";

import EventList from '.'

const wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>

const mockEventList = [
  {
    thumb: '/images/event-1.jpg',
    title: 'ROH Final Battle 2022',
    date: '2022-12-05T01:29:51.064Z',
    description: 'Live stream',
    link: '#'
  }, {
    thumb: '/images/event-2.jpg',
    title: 'Impact Wrestling Hard to Kill 2023',
    date: '2022-12-05T01:29:51.064Z',
    description: 'Live stream',
    link: '#'
  }
]

describe('EventList', () => {
  it('should render empty list', () => {
    const { getByText } = render(<EventList items={[]} />, { wrapper })
    expect(getByText(/Não há eventos./)).toBeInTheDocument()
  })

  it('should render loading state', () => {
    const { getByText } = render(<EventList isLoading={true} />, { wrapper })
    expect(getByText(/Carregando.../)).toBeInTheDocument()
  })

  it('should render one list item', () => {
    const { container } = render(<EventList items={mockEventList.slice(0, 1)} />, { wrapper })

    const eventItems = container.querySelectorAll('.event-item')
    expect(eventItems).toHaveLength(1)
  })

  it('should render two list item', () => {
    const { container } = render(<EventList items={mockEventList} />, { wrapper })

    const eventItems = container.querySelectorAll('.event-item')
    expect(eventItems).toHaveLength(2)
  })

  it('should render with column direction', () => {
    const { container } = render(<EventList
      items={mockEventList}
      direction="column" />, { wrapper })

    expect(container.querySelector('.flex.flex-col')).toBeInTheDocument()
  })
})

