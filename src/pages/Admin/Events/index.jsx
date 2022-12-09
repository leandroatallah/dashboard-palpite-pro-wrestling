import { Link } from 'react-router-dom'
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import Table from '../../../components/Table'

const AdminEventos = () => {
  const columns = [
    {
      title: 'Id',
      key: 'id',
      small: true,
    },
    {
      title: 'Title',
      key: 'title'
    },
    {
      title: 'Data',
      key: 'date'
    },
    {
      title: 'Link',
      key: 'link',
      small: true,
    },
  ]
  const data = [
    {
      id: 1,
      title: 'Texto 1',
      date: '05/12/2022',
      link: <Link to="/" className="text-blue-600 font-semibold">Abrir</Link>,
    },
    {
      id: 2,
      title: 'Texto 2',
      date: '05/12/2022',
      link: <Link to="/" className="text-blue-600 font-semibold">Abrir</Link>,
    },
    {
      id: 3,
      title: 'Texto 2',
      date: '05/12/2022',
      link: <Link to="/" className="text-blue-600 font-semibold">Abrir</Link>,
    },
    {
      id: 4,
      title: 'Texto 2',
      date: '05/12/2022',
      link: <Link to="/" className="text-blue-600 font-semibold">Abrir</Link>,
    },
  ]

  return (
    <AdminLayout title="Gerenciar eventos">
      <Card>
        <Table
          columns={columns}
          data={data}
        />
      </Card>
    </AdminLayout>
  )
}

export default AdminEventos