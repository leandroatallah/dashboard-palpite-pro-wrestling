import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import moment from 'moment'
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import Table from '../../../components/Table'
import api from '../../../services/api'
import { queryClient } from '../../../services/query';

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
    },
    {
      title: '',
      key: 'edit',
      small: true,
      render: (id) => <Link to={`/admin/temporadas/${id}`}>Editar</Link>,
      renderKey: 'id'
    },
  ]



  useEffect(() => {
    queryClient.removeQueries('season/id')
  }, [])

  return (
    <AdminLayout title="Gerenciar temporadas">
      <Card>
        <Table
          columns={columns}
          data={seasonQuery.data?.length ? seasonQuery.data : []}
        />
      </Card>
    </AdminLayout>
  )
}

export default AdminSeasons