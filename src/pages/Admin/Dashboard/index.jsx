import { Link } from 'react-router-dom'
import Card from '../../../components/Card'
import AdminLayout from '../../../components/Admin/Layout'

const AdminDashboard = () => {

  return (
    <AdminLayout title="Dashboard">
      <Card>
        Olá! Bem-vindo ao painel adminstrativo.

        <hr className="my-6 border-zinc-800" />

        <ul className="list-disc list-inside">
          <li>
            <Link className="text-blue-600 font-semibold" to="/admin/eventos/novo">Adicionar evento</Link>
          </li>
          <li>
            <Link className="text-blue-600 font-semibold" to="/admin/lutadores/novo">Adicionar lutador</Link>
          </li>
          <li>
            <Link className="text-blue-600 font-semibold" to="/admin/temporadas/novo">Adicionar temporada</Link>
          </li>
        </ul>
      </Card>
    </AdminLayout>
  )
}

export default AdminDashboard