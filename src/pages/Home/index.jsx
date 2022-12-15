import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
import Card from '../../components/Card'
import DataInfoList from '../../components/DataInfoList'
import EventList from '../../components/EventList'
import api from '../../services/api'
import { useQuery } from 'react-query'

const Home = () => {
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
      <div className="flex flex-col md:flex-row gap-6 mt-10 mb-8">
        <div className="w-7/12 flex flex-col">
          <SectionTitle className="mt-0">
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
          <Card className="h-full">
            <SectionTitle className="mt-0" link={{ label: "+ VER MAIS", href: "/eventos" }}>
              Próximos eventos
            </SectionTitle>
            <EventList
              items={eventQuery.data?.length ? eventQuery.data.slice(0, 3) : []}
              direction="column"
              isLoading={eventQuery.isLoading}
            />
          </Card>
        </div>
      </div>
      {/* <Card className="min-h-[200px] md:min-h-[280px] flex-center">
        Não há eventos próximos de expirar.
      </Card> */}
    </Layout >
  )
}

export default Home;