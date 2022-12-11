import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import { Button, Input, Select } from '../../../components/Form'
import api from '../../../services/api'
import { queryClient } from '../../../services/query';
import seasonStatus from '../../../config/seasonStatus.json'

const AdminAddSeason = ({ edit }) => {
  const [showError, setShowError] = useState(false)
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [redirectTo, setRedirectTo] = useState(false)

  const { id: seasonId } = useParams()

  const seasonEditQuery = useQuery('season/id', async () => {
    return await api.get(`season/${seasonId}`)
      .then(({ data }) => data?.result)
      .catch(() => {
        toast.error("Houve algum erro ao fazer sua solicitação");
        return <Navigate to="/admin/temporadas" />
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!edit
  })

  const eventBySeasonQuery = useQuery('event/season', async () => {
    return await api.get(`season/?season_id=${seasonId}`)
      .then(({ data }) => data?.result)
      .catch(() => {
        toast.error("Houve algum erro ao fazer sua solicitação");
        return <Navigate to="/admin/temporadas" />
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!edit
  })

  useEffect(() => {
    console.log(eventBySeasonQuery.data)
  }, [eventBySeasonQuery.status])

  useEffect(() => {
    if (seasonEditQuery.isSuccess && seasonEditQuery.data) {
      const { title, status } = seasonEditQuery.data

      setTitle(title)
      setStatus(status)
    }
  }, [seasonEditQuery.status])

  useEffect(() => {
    if (!edit) {
      setTitle('')
      setStatus('')
    }
  }, [edit])

  async function handleSubmit(e) {
    e.preventDefault()
    setShowError(false)

    if (!title || !status) {
      return setShowError(true)
    }

    setIsSubmitting(true)
    setShowError(false)

    let param = 'create'

    if (edit) {
      param = 'update'
    }

    await api.post(`/season/${param}`, {
      parameter: {
        id: seasonId,
        title,
        status,
      }
    })
      .then(() => {
        setTitle('')
        setStatus('')
        toast.success(
          edit ?
            "Temporada atualizada com sucesso." :
            "Temporada cadastrada com sucesso."
        )
        queryClient.removeQueries()
        setRedirectTo('/admin/temporadas')
      })
      .catch(err => {
        console.log(err)
        return toast.error("Houve algum erro ao fazer sua solicitação");
      }).finally(() => {
        setIsSubmitting(false)
      })
  }

  async function handleDelete() {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) {
      return
    }

    if (eventBySeasonQuery.data?.length) {
      toast.error('Não é possível excluir temporadas com eventos vinculados.')
      return
    }

    setIsSubmitting(true)
    setShowError(false)

    await api.delete(`/season/${seasonId}`)
      .then(() => {
        toast.success("Temporada excluída com sucesso.")
        queryClient.removeQueries()
        setRedirectTo('/admin/temporadas')
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
    <AdminLayout title="Gerenciar temporadas / Novo">
      <Card>
        {seasonEditQuery.isLoading || eventBySeasonQuery.isLoading ? 'Carregando...' : (
          <form onSubmit={handleSubmit}>
            <Input
              required
              type="text"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              value={title}
              placeholder="Digite o título da temporada"
              isError={showError}
            />
            <Select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              items={[
                {
                  value: '',
                  label: 'Selecione o status',
                  disabled: true
                },
                ...seasonStatus
              ]}
              isError={showError} />
            <div className="flex justify-end items-center gap-2">
              {edit ? (<Button
                color="danger"
                inline
                type="button"
                loading={isSubmitting}
                onClick={handleDelete}>
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

export default AdminAddSeason
