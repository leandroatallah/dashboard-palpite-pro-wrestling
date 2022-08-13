import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
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
  {
    thumb: 'images/event-4.jpg',
    title: 'Ice Wars II',
    date: '2022-08-11',
    description: 'Curabitur nulla felis, cursus at efficitur sit amet, ultricies sed orci.',
    link: '/eventos/evento',
  },
  {
    thumb: 'images/event-1.jpg',
    title: 'BATTLE SLAM THE TAKEOVER 2',
    date: '2022-08-11',
    description: 'Curabitur nulla felis, cursus at efficitur sit amet, ultricies sed orci.',
    link: '/eventos/evento',
  },
  {
    thumb: 'images/event-2.jpg',
    title: 'AEW ALL OUT CHICAGO 2',
    date: '2022-08-11',
    description: 'Curabitur nulla felis, cursus at efficitur sit amet, ultricies sed orci.',
    link: '/eventos/evento',
  },
  {
    thumb: 'images/event-3.jpg',
    title: 'GCW HOMECOMING PART 1 2',
    date: '2022-08-11',
    description: 'Curabitur nulla felis, cursus at efficitur sit amet, ultricies sed orci.',
    link: '/eventos/evento',
  },
  {
    thumb: 'images/event-4.jpg',
    title: 'Ice Wars II 2',
    date: '2022-08-11',
    description: 'Curabitur nulla felis, cursus at efficitur sit amet, ultricies sed orci.',
    link: '/eventos/evento',
  },
  {
    thumb: 'images/event-1.jpg',
    title: 'BATTLE SLAM THE TAKEOVER 3',
    date: '2022-08-11',
    description: 'Curabitur nulla felis, cursus at efficitur sit amet, ultricies sed orci.',
    link: '/eventos/evento',
  },
  {
    thumb: 'images/event-2.jpg',
    title: 'AEW ALL OUT CHICAGO 3',
    date: '2022-08-11',
    description: 'Curabitur nulla felis, cursus at efficitur sit amet, ultricies sed orci.',
    link: '/eventos/evento',
  },
  {
    thumb: 'images/event-3.jpg',
    title: 'GCW HOMECOMING PART 1 3',
    date: '2022-08-11',
    description: 'Curabitur nulla felis, cursus at efficitur sit amet, ultricies sed orci.',
    link: '/eventos/evento',
  },
  {
    thumb: 'images/event-4.jpg',
    title: 'Ice Wars II 3',
    date: '2022-08-11',
    description: 'Curabitur nulla felis, cursus at efficitur sit amet, ultricies sed orci.',
    link: '/eventos/evento',
  },
]

const Eventos = () => {
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