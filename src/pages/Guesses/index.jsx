import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
import Card from '../../components/Card'
import DataInfoList from '../../components/DataInfoList'

const Palpites = () => {
  return (
    <Layout>
      <SectionTitle>
        Palpites
      </SectionTitle>
      <div className="mb-8">
        <Card className="min-h-[340px] md:h-full flex-center">
          Ainda não há informações.
        </Card>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-7/12">
          <SectionTitle>
            Informações
          </SectionTitle>
          <DataInfoList />
        </div>
        <div className="w-5/12">
          <SectionTitle>
            Ranking
          </SectionTitle>
          <Card className="md:h-full flex-center">
            Ainda não há informações.
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default Palpites;