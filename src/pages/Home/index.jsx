import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
import Card from '../../components/Card'
import DataInfoList from '../../components/DataInfoList'
import EventList from '../../components/EventList'
import api from '../../services/api'

const Home = () => {
  const [events, setEvents] = useState([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(true)

  useEffect(() => {
    (async () => {
      await api.get('/event/')
        .then(({ data }) => {
          const { result } = data
          setEvents(result.slice(0, 3))
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