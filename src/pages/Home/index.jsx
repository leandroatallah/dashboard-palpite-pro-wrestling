import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
import Card from '../../components/Card'
import DataInfoList from '../../components/DataInfoList'
import EventList from '../../components/EventList'

const Home = () => {
  const [events, setEvents] = useState([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(true)
  console.log('rendered')

  // TODO: Change to axios
  const API_URL = process.env.NODE_ENV !== 'development' ?
    import.meta.env.VITE_API_PRODUCTION_URL :
    import.meta.env.VITE_API_LOCAL_URL

  useEffect(() => {
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
  }, [])

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-7/12 flex flex-col">
          <SectionTitle>
            Informações
          </SectionTitle>
          <DataInfoList />
          <SectionTitle>
            Taxa de acerto de palpite
          </SectionTitle>
          <Card className="min-h-[260px] md:h-full flex-center">
            Ainda não há informações.
          </Card>
        </div>
        <div className="w-5/12">
          <SectionTitle link={{ label: "+ VER MAIS", href: "/eventos" }}>
            Próximos eventos
          </SectionTitle>
          <EventList items={events} direction="column" isLoading={isLoadingEvents} />
        </div>
      </div>
      <Card className="min-h-[200px] md:min-h-[280px] flex-center">
        Não há eventos próximos de expirar.
      </Card>
    </Layout >
  )
}

export default Home;