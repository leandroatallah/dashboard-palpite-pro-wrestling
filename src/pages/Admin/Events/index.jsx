import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import moment from 'moment'
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import Table from '../../../components/Table'
import api from '../../../services/api'
import { queryClient } from '../../../services/query';
import { Button } from '../../../components/Form'

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
      render: (id) => <Link className="text-blue-600 font-semibold" to={`/admin/eventos/${id}`}>Editar</Link>,
      renderKey: 'id'
    },
  ]

  useEffect(() => {
    queryClient.removeQueries('event/id')

    return () => queryClient.removeQueries('event')
  }, [])

  return (
    <AdminLayout title="Gerenciar eventos">
      <Card>
        <div className="mb-4 text-right">
          <Link to="/admin/eventos/novo">
            <Button inline color="success" type="button">+ Adicionar novo</Button>
          </Link>
        </div>
        <Table
          columns={columns}
          data={eventQuery.data?.length ? eventQuery.data : []}
          isLoading={eventQuery.isLoading}
        />
      </Card>
    </AdminLayout>
  )
}

export default AdminEventos