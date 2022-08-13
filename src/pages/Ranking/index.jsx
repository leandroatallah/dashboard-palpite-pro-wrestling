import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
import Card from '../../components/Card'

const Ranking = () => {
  return (
    <Layout>
      <SectionTitle>
        Ranking
      </SectionTitle>
      <Card className="min-h-[260px] md:h-full flex-center mb-8">
        Ainda não há informações.
      </Card>
      <Card className="min-h-[260px] md:h-full flex-center mb-8">
        Ainda não há informações.
      </Card>
    </Layout>
  )
}

export default Ranking;