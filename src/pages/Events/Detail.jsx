import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
import Card from '../../components/Card'

const EventDetail = () => {
  return (
    <Layout>
      <SectionTitle>
        EventDetail
      </SectionTitle>
      <Card className="h-screen flex-center mb-8">
        Ainda não há informações.
      </Card>
    </Layout>
  )
}

export default EventDetail;