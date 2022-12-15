import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import Table from '../../../components/Table'
import api from '../../../services/api'
import { queryClient } from '../../../services/query';
import seasonStatus from '../../../config/seasonStatus.json'
import { Button } from '../../../components/Form'

const AdminSeasons = () => {
  const seasonQuery = useQuery('season', async () => {
    return await api.get('/season/')
      .then(({ data }) => data?.result)
      .catch(err => {
        console.log(err)
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  const columns = [
    {
      title: '#',
      key: 'id',
      small: true,
    },
    {
      title: 'Title',
      key: 'title'
    },
    {
      title: 'Status',
      key: 'status',
      small: true,
      render: (status) => seasonStatus.find((item) => item.value === status)?.label || ''
    },
    {
      title: '',
      key: 'edit',
      small: true,
      align: 'center',
      render: (_, { id }) => <Link className="text-blue-600 font-semibold" to={`/admin/temporadas/${id}`}>Editar</Link>,
    },
  ]

  useEffect(() => {
    queryClient.removeQueries('season/id')

    return () => queryClient.removeQueries('season')
  }, [])

  return (
    <AdminLayout title="Gerenciar temporadas">
      <Card>
        <div className="mb-4 text-right">
          <Link to="/admin/temporadas/novo">
            <Button inline color="success" type="button">+ Adicionar novo</Button>
          </Link>
        </div>
        <Table
          columns={columns}
          data={seasonQuery.data?.length ? seasonQuery.data : []}
          isLoading={seasonQuery.isLoading}
        />
      </Card>
    </AdminLayout>
  )
}

export default AdminSeasons