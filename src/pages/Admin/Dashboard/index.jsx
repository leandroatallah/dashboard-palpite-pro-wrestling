import { Link } from 'react-router-dom'
import Card from '../../../components/Card'
import AdminLayout from '../../../components/Admin/Layout'

const menuItems = [
  {
    label: 'Adicionar evento',
    href: "/admin/eventos/novo"
  },
  {
    label: 'Adicionar lutador',
    href: "/admin/lutadores/novo"
  },
  {
    label: 'Adicionar temporada',
    href: "/admin/temporadas/novo"
  },
]

const AdminDashboard = () => {

  return (
    <AdminLayout title="Dashboard">
      <Card>
        Olá! Bem-vindo ao painel adminstrativo.

        <hr className="my-6 border-zinc-800" />

        <div className="text-lg font-bold mb-2">Links rápidos</div>
        <ul className="list-disc list-inside">
          {menuItems.map(({ label, href }) => (
            <li>
              <Link className="text-blue-600 inline-block font-semibold text-lg mb-2" to={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </Card>
    </AdminLayout>
  )
}

export default AdminDashboard