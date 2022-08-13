import Layout from '../../components/Layout'
import SectionTitle from '../../components/SectionTitle'
import Card from '../../components/Card'

const Conta = () => {
  return (
    <Layout>
      <SectionTitle>
        Conta
      </SectionTitle>
      <Card className="min-h-[260px] md:h-full flex-center">
        Ainda não há informações.
      </Card>
    </Layout>
  )
}

export default Conta;