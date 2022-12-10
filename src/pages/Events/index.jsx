import { useQuery } from 'react-query'
import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
import EventList from '../../components/EventList'
import api from '../../services/api'

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
      <EventList
        items={eventQuery.data?.length ? eventQuery.data : null}
        isLoading={eventQuery.isLoading}
      />
    </Layout>
  )
}

export default Eventos;