import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
import Card from '../../components/Card'
import DataInfoList from '../../components/DataInfoList'
import EventList from '../../components/EventList'

const events = [
  {
    thumb: 'images/event-1.jpg',
    title: 'BATTLE SLAM THE TAKEOVER',
    date: '2022-08-11',
    description: 'Curabitur nulla felis, cursus at efficitur sit amet, ultricies sed orci.',
    link: '/eventos/evento',
  },
  {
    thumb: 'images/event-2.jpg',
    title: 'AEW ALL OUT CHICAGO',
    date: '2022-08-11',
    description: 'Curabitur nulla felis, cursus at efficitur sit amet, ultricies sed orci.',
    link: '/eventos/evento',
  },
  {
    thumb: 'images/event-3.jpg',
    title: 'GCW HOMECOMING PART 1',
    date: '2022-08-11',
    description: 'Curabitur nulla felis, cursus at efficitur sit amet, ultricies sed orci.',
    link: '/eventos/evento',
  },
]

const Home = () => {
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
          <EventList items={events} direction="column" />
        </div>
      </div>
      <Card className="min-h-[200px] md:min-h-[280px] flex-center">
        Não há eventos próximos de expirar.
      </Card>
    </Layout >
  )
}

export default Home;