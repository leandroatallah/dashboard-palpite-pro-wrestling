import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import Table from '../../../components/Table'
import api from '../../../services/api'
import { queryClient } from '../../../services/query';
import { Button } from '../../../components/Form'

const AdminWrestlers = () => {
  const wrestlerQuery = useQuery('wrestler', async () => {
    return await api.get('/wrestler/')
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
      title: 'Nome',
      key: 'name'
    },
    {
      title: '',
      key: 'edit',
      small: true,
      align: 'center',
      render: (_, { id }) => <Link className="text-blue-600 font-semibold" to={`/admin/lutadores/${id}`}>Editar</Link>,
    },
  ]

  useEffect(() => {
    queryClient.removeQueries('wrestler/id')

    return () => queryClient.removeQueries('wrestler')
  }, [])

  return (
    <AdminLayout title="Gerenciar lutadores">
      <Card>
        <div className="mb-4 text-right">
          <Link to="/admin/lutadores/novo">
            <Button inline color="success" type="button">+ Adicionar novo</Button>
          </Link>
        </div>
        <Table
          columns={columns}
          data={wrestlerQuery.data?.length ? wrestlerQuery.data : []}
          isLoading={wrestlerQuery.isLoading}
        />
      </Card>
    </AdminLayout>
  )
}

export default AdminWrestlers