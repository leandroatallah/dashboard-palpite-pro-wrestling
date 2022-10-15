import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
import EventList from '../../components/EventList'
import api from '../../services/api'

const Eventos = () => {
  const [events, setEvents] = useState([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(true)

  useEffect(() => {
    (async () => {
      await api.get('/event/')
        .then(({ data }) => {
          const { result } = data
          setEvents(result)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setIsLoadingEvents(false)
        })
    })()
  }, [])

  return (
    <Layout>
      <SectionTitle>
        Eventos
      </SectionTitle>
      <EventList items={events} isLoading={isLoadingEvents} />
    </Layout>
  )
}

export default Eventos;