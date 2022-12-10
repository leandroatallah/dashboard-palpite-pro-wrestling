import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import moment from 'moment'
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import Table from '../../../components/Table'
import api from '../../../services/api'
import { queryClient } from '../../../services/query';

const AdminEventos = () => {
  const eventQuery = useQuery('event', async () => {
    return await api.get('/event/')
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
      title: 'Data',
      key: 'date',
      small: true,
      render: (text) => moment(text).format('l')
    },
    {
      title: '',
      key: 'edit',
      small: true,
      render: (id) => <Link to={`/admin/eventos/${id}`}>Editar</Link>,
      renderKey: 'id'
    },
  ]



  useEffect(() => {
    queryClient.removeQueries('event/id')
  }, [])

  return (
    <AdminLayout title="Gerenciar eventos">
      <Card>
        <Table
          columns={columns}
          data={eventQuery.data?.length ? eventQuery.data : []}
        />
      </Card>
    </AdminLayout>
  )
}

export default AdminEventos