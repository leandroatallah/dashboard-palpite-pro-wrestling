import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import Table from '../../../components/Table'
import api from '../../../services/api'
import { queryClient } from '../../../services/query';
import seasonStatus from '../../../config/seasonStatus.json'

const AdminGuess = () => {
  const guessQuery = useQuery('guess', async () => {
    return await api.get('/guess/')
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
      title: 'Evento',
      key: 'event'
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
      render: (id) => <Link className="text-blue-600 font-semibold" to={`/admin/temporadas/${id}`}>Editar</Link>,
      renderKey: 'id'
    },
  ]

  useEffect(() => {
    queryClient.removeQueries('guess/id')

    return () => queryClient.removeQueries('guess')
  }, [])

  return (
    <AdminLayout title="Gerenciar palpites">
      <Card>
        <Table
          columns={columns}
          data={guessQuery.data?.length ? guessQuery.data : []}
          isLoading={guessQuery.isLoading}
        />
      </Card>
    </AdminLayout>
  )
}

export default AdminGuess
