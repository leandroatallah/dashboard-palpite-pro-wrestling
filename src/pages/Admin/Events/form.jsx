import { useEffect } from 'react';
import { useState } from 'react'
import { useQuery } from 'react-query';
import { Navigate, redirect, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import { Button, Input } from '../../../components/Form'
import api from '../../../services/api'

const AdminAddEvent = ({ edit }) => {
  const [showError, setShowError] = useState(false)
  const [title, setTitle] = useState('')
  const [thumbUrl, setThumbUrl] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { id: eventId } = useParams()

  const eventEditQuery = useQuery('event/id', async () => {
    return await api.get(`event/${eventId}`)
      .then(({ data }) => data?.result)
      .catch(() => {
        toast.error("Houve algum erro ao fazer sua solicitação");
        return <Navigate to="/admin/eventos" />
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!edit
  })

  useEffect(() => {
    if (eventEditQuery.isSuccess) {
      const { title, thumb, date, description } = eventEditQuery.data

      setTitle(title)
      setThumbUrl(thumb)
      setDate(date)
      setDescription(description)
    }
  }, [eventEditQuery.status])

  useEffect(() => {
    if (!edit) {
      setTitle('')
      setThumbUrl('')
      setDate('')
      setDescription('')
    }
  }, [edit])

  async function handleSubmit(e) {
    e.preventDefault()
    setShowError(false)

    if (!title || !thumbUrl || !date || !description) {
      return setShowError(true)
    }

    setIsSubmitting(true)
    setShowError(false)

    let param = 'create'

    if (edit) {
      param = 'update'
    }

    await api.post(`/event/${param}`, {
      parameter: {
        id: eventId,
        title,
        description,
        date,
        thumb: thumbUrl,
      }
    })
      .then(() => {
        setTitle('')
        setThumbUrl('')
        setDate('')
        setDescription('')
        toast.success(
          edit ?
            "Evento atualizado com sucesso." :
            "Evento cadastrado com sucesso."
        )
        return redirect('/admin/eventos')
      })
      .catch(err => {
        console.log(err)
        return toast.error("Houve algum erro ao fazer sua solicitação");
      }).finally(() => {
        setIsSubmitting(false)
      })
  }

  if (eventEditQuery.isLoading) {
    return 'Carregando...'
  }

  return (
    <AdminLayout title="Gerenciar eventos / Novo">
      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            required
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
            value={title}
            placeholder="Digite o título do evento"
            isError={showError}
          />
          <Input
            required
            type="url"
            name="thumb"
            onChange={(e) => setThumbUrl(e.target.value)}
            defaultValue={thumbUrl}
            value={thumbUrl}
            placeholder="Digite o endereço (url) da thumbnail"
            isError={showError}
            errorText="Insira uma URL válida"
          />
          <Input
            required
            type="datetime-local"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            defaultValue={date}
            value={date}
            placeholder="Digite a data do evento"
            isError={showError}
          />
          <Input
            required
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={description}
            value={description}
            placeholder="Digite uma descrição"
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

export default AdminAddEvent
