import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import { Button, Input } from '../../../components/Form'
import api from '../../../services/api'
import { queryClient } from '../../../services/query';

const AdminAddWrestler = ({ edit }) => {
  const [showError, setShowError] = useState(false)
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [redirectTo, setRedirectTo] = useState(false)

  const { id: wrestlerId } = useParams()

  const wrestlerEditQuery = useQuery('wrestler/id', async () => {
    return await api.get(`wrestler/${wrestlerId}`)
      .then(({ data }) => data?.result)
      .catch(() => {
        toast.error("Houve algum erro ao fazer sua solicitação");
        setRedirectTo('/admin/lutadores')
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!edit
  })

  useEffect(() => {
    if (wrestlerEditQuery.isSuccess && wrestlerEditQuery.data) {
      const { name } = wrestlerEditQuery.data

      setName(name)
    }
  }, [wrestlerEditQuery.status])

  useEffect(() => {
    if (!edit) {
      setName('')
    }
  }, [edit])

  async function handleSubmit(e) {
    e.preventDefault()
    setShowError(false)

    if (!name) {
      return setShowError(true)
    }

    setIsSubmitting(true)
    setShowError(false)

    let param = 'create'

    if (edit) {
      param = 'update'
    }

    await api.post(`/wrestler/${param}`, {
      parameter: {
        id: wrestlerId,
        name,
      }
    })
      .then(() => {
        setName('')
        toast.success(
          edit ?
            "Lutador atualizado com sucesso." :
            "Lutador cadastrado com sucesso."
        )
        queryClient.removeQueries()
        setRedirectTo('/admin/lutadores')
      })
      .catch(err => {
        console.log(err)
        return toast.error("Houve algum erro ao fazer sua solicitação");
      }).finally(() => {
        setIsSubmitting(false)
      })
  }

  async function handleDelete() {
    setIsSubmitting(true)
    setShowError(false)

    await api.delete(`/wrestler/${wrestlerId}`)
      .then(() => {
        toast.success("Lutador excluído com sucesso.")
        queryClient.removeQueries()
        setRedirectTo('/admin/lutadores')
      })
      .catch(err => {
        console.log(err)
        return toast.error("Houve algum erro ao fazer sua solicitação");
      }).finally(() => {
        setIsSubmitting(false)
      })
  }

  if (!!redirectTo) {
    return <Navigate to={redirectTo} />
  }

  return (
    <AdminLayout title="Gerenciar lutadores / Novo">
      <Card>
        {wrestlerEditQuery.isLoading ? 'Carregando...' : (
          <form onSubmit={handleSubmit}>
            <Input
              required
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Digite o nome do lutador"
              isError={showError}
            />
            <div className="flex justify-end items-center gap-2">
              {edit ? (<Button
                color="danger"
                inline
                type="button"
                loading={isSubmitting}
                onClick={() => { if (window.confirm('Tem certeza que deseja excluir este item?')) handleDelete() }}>
                Excluir
              </Button>) : null}
              <Button color="success" inline type="submit" loading={isSubmitting}>
                {edit ? 'Atualizar' : 'Cadastrar'}
              </Button>
            </div>

            {showError && <div className="mt-4 text-center font-light text-base text-red-500">
              Existem campos inválidos
            </div>}
          </form>
        )}
      </Card>
    </AdminLayout>
  )
}

export default AdminAddWrestler
