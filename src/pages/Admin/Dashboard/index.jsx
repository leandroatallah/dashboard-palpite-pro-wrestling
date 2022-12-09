import Card from '../../../components/Card'
import AdminLayout from '../../../components/Admin/Layout'

const AdminDashboard = () => {

  return (
    <AdminLayout title="Dashboard">
      <Card className="h-full">
        Olá! Bem-vindo ao painel adminstrativo.
      </Card>
    </AdminLayout>
  )
}

export default AdminDashboard