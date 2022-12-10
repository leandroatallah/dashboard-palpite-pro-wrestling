import { useEffect } from 'react';
import { useState } from 'react'
import { useQuery } from 'react-query';
import { Navigate, redirect, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import { Button, Input } from '../../../components/Form'
import api from '../../../services/api'

const AdminAddSeason = ({ edit }) => {
  const [showError, setShowError] = useState(false)
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    refetchOnWindowFocus: true,
    enabled: !!edit
  })

  useEffect(() => {
    if (seasonEditQuery.isSuccess) {
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
        return redirect('/admin/temporadas')
      })
      .catch(err => {
        console.log(err)
        return toast.error("Houve algum erro ao fazer sua solicitação");
      }).finally(() => {
        setIsSubmitting(false)
      })
  }

  if (seasonEditQuery.isLoading) {
    return 'Carregando...'
  }

  return (
    <AdminLayout title="Gerenciar temporadas / Novo">
      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            required
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
            value={title}
            placeholder="Digite o título da temporada"
            isError={showError}
          />
          <Input
            required
            type="text"
            name="status"
            onChange={(e) => setStatus(e.target.value)}
            defaultValue={status}
            value={status}
            placeholder="Status"
            isError={showError}
          />
          <Button type="submit" loading={isSubmitting}>
            {edit ? 'Atualizar' : 'Cadastrar'}
          </Button>

          {showError && <div className="mt-4 text-center font-light text-base text-red-500">
            Existem campos inválidos
          </div>}
        </form>
      </Card>
    </AdminLayout>
  )
}

export default AdminAddSeason
