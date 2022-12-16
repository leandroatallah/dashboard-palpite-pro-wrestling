import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../../services/api'
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import Table from '../../../components/Table'
import { currentUserEmailAtom } from '../../../store/atoms'
import { useAtom } from 'jotai'

const AdminUsers = () => {
  const [currentUserEmail] = useAtom(currentUserEmailAtom)

  const userListQuery = useQuery('user', async () => {
    return await api.get('/user/')
      .then(({ data }) => data?.result)
      .catch(e => {
        console.log(e)
        toast.error("Houve algum erro ao fazer sua solicitação");
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  async function handleDelete(id) {
    await api.delete(`/user/${id}`)
      .then(() => {
        toast.success("Usuário excluído com sucesso.")
        userListQuery.refetch()
      })
      .catch(err => {
        console.log(err)
        return toast.error("Houve algum erro ao fazer sua solicitação");
      })
  }

  async function handlePromote(id) {
    await api.patch(`/user/promote/${id}`, {
      parameter: {
        isSuperuser: true
      }
    })
      .then(() => {
        toast.success("Usuário alterado com sucesso.")
        userListQuery.refetch()
      })
      .catch(err => {
        console.log(err)
        return toast.error("Houve algum erro ao fazer sua solicitação");
      })
  }

  const columns = [
    {
      title: '#',
      key: 'id',
      small: true,
    },
    {
      title: 'Email',
      key: 'email',
      render: (_, { email }) => (
        <>
          {email}
          {currentUserEmail === email ? (
            <span className="text-sm text-zinc-400 inline-block ml-1">(você)</span>
          ) : ''}
        </>
      )
    },
    {
      title: 'Nível de acesso',
      key: 'isSuperuser',
      small: true,
      render: (isSuperuser) => isSuperuser ? 'Admin' : '-'
    },
    {
      title: '',
      key: 'edit',
      small: true,
      align: 'center',
      render: (_, { id, email }) => {
        if (currentUserEmail === email) {
          return
        }
        return (
          <Link
            className="text-blue-600 font-semibold"
            to="#"
            onClick={(e) => {
              e.preventDefault()
              if (window.confirm('Tem certeza que deseja excluir este usuário?'))
                handleDelete(id)
            }}>
            Excluir
          </Link>
        )
      },
    },
    {
      title: '',
      key: 'set_super_user',
      small: true,
      align: 'center',
      render: (_, { id, email, isSuperuser }) => {
        if (currentUserEmail === email) {
          return
        }

        return (
          <Link
            className="text-blue-600 font-semibold"
            to="#"
            onClick={(e) => {
              e.preventDefault()
              if (window.confirm('Tem certeza que deseja tornar este usuário um administrador?'))
                handlePromote(id)
            }}>
            {isSuperuser ? 'Remover privilégios' : 'Promover a administrador'}
          </Link>
        )
      },
    },
  ]

  return (
    <AdminLayout title="Gerenciar usuários">
      <Card>
        {!userListQuery.isLoading ? (
          <Table
            columns={columns}
            data={userListQuery.data}
          />
        ) : 'Carregando...'}
      </Card>
    </AdminLayout>
  )
}

export default AdminUsers