import { useQuery } from 'react-query'
import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
import EventList from '../../components/EventList'
import api from '../../services/api'
import Card from '../../components/Card'

const Eventos = () => {
  const eventQuery = useQuery('event', async () => {
    return await api.get('/event/')
      .then(({ data }) => data?.result)
      .catch(err => {
        console.log(err)
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  return (
    <Layout>
      <SectionTitle>
        Eventos
      </SectionTitle>
      {eventQuery.data?.length ? (
        <EventList
          items={eventQuery.data?.length ? eventQuery.data : null}
          isLoading={eventQuery.isLoading}
        />
      ) : (
        <Card className="min-h-[260px] md:h-full flex-center mb-8">
          Ainda não eventos disponíves.
        </Card>
      )}
    </Layout>
  )
}

export default Eventos;