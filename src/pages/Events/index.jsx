import { useState } from 'react'
import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
import EventList from '../../components/EventList'

const Eventos = () => {
  const [events, setEvents] = useState([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(true)

  const API_URL = process.env.NODE_ENV !== 'development' ?
    import.meta.env.VITE_API_PRODUCTION_URL :
    import.meta.env.VITE_API_LOCAL_URL

  fetch(`${API_URL}/event/`)
    .then(res => res.json())
    .then(data => {
      setEvents(data.result)
    })
    .catch(err => {
      // TODO: Create feedback for errors
      console.log(err)
    })
    .finally(() => {
      setIsLoadingEvents(false)
    })

  return (
    <Layout>
      <SectionTitle>
        Eventos
      </SectionTitle>
      <EventList items={events} />
    </Layout>
  )
}

export default Eventos;