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

const AdminGuess = () => {
  const eventListQuery = useQuery('event/status_active', async () => {
    return await api.get(`event/?event_status=active`)
      .then(({ data }) => {
        const { result } = data
        return result
      })
      .catch(() => {
        toast.error("Houve algum erro ao fazer sua solicitação");
        setRedirectTo('/admin/palpites')
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  const columns = [
    {
      title: 'Title',
      key: 'title'
    },
    {
      title: 'Palpite',
      key: 'guess_count',
      small: true,
      render: (guess_count) => {
        let bgColor = 'bg-yellow-700'
        let label = 'Não enviado'

        if (guess_count > 0) {
          bgColor = 'bg-green-700'
          label = 'Enviado'
        }

        return (
          <div className={`text-sm inline-block text-white  p-1 px-4 rounded-2xl ${bgColor}`}>
            {label}
          </div>
        )
      }
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
      render: (_, { id, guess_count }) => <Link className="text-blue-600 font-semibold" to={`/admin/palpites/${id}`}>
        {guess_count > 0 ? 'Editar' : 'Fazer'} palpite
      </Link>,
    },
  ]

  useEffect(() => {
    queryClient.removeQueries('guess/id')

    return () => queryClient.removeQueries('guess')
  }, [])

  return (
    <AdminLayout title="Gerenciar palpites">
      <Card>
        <div className="mb-4 text-right">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">Eventos ativos</div>
            <Link to="/admin/palpites/novo">
              <Button inline color="success" type="button">+ Adicionar novo</Button>
            </Link>
          </div>
        </div>
        <Table
          columns={columns}
          data={eventListQuery.data?.length ? eventListQuery.data : []}
          isLoading={eventListQuery.isLoading}
        />
      </Card>
    </AdminLayout>
  )
}

export default AdminGuess
