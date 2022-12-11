import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import { Button, Input, Select } from '../../../components/Form'
import api from '../../../services/api'
import { queryClient } from '../../../services/query';

const blankMatch = {
  title: '',
  description: '',
  guesses: [],
  wrestlers: []
}

const AdminAddEvent = ({ edit }) => {
  const [showError, setShowError] = useState(false)
  const [title, setTitle] = useState('')
  const [thumbUrl, setThumbUrl] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [season, setSeason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [redirectTo, setRedirectTo] = useState(false)
  const [matchList, setMatchList] = useState([])

  const { id: eventId } = useParams()

  const eventEditQuery = useQuery('event/id', async () => {
    return await api.get(`event/${eventId}`)
      .then(({ data }) => data?.result)
      .catch(() => {
        toast.error("Houve algum erro ao fazer sua solicitação");
        setRedirectTo('/admin/eventos')
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!edit
  })

  const matchListQuery = useQuery('match/event_id', async () => {
    return await api.get(`match/?event_id=${eventId}`)
      .then(({ data }) => data?.result)
      .catch(() => {
        toast.error("Houve algum erro ao fazer sua solicitação");
        setRedirectTo('/admin/eventos')
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!edit
  })

  const seasonListQuery = useQuery('season', async () => {
    return await api.get(`season/`)
      .then(({ data }) => {
        const { result } = data
        return result.map(({ id, title }) => ({
          label: title,
          value: id,
        }))
      })
      .catch(() => {
        toast.error("Houve algum erro ao fazer sua solicitação");
        setRedirectTo('/admin/eventos')
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (eventEditQuery.isSuccess && eventEditQuery.data) {
      const { title, thumb, date, description, season_id } = eventEditQuery.data

      setTitle(title)
      setThumbUrl(thumb)
      setDate(date)
      setDescription(description)
      setSeason(season_id)
    }
  }, [eventEditQuery.status])

  useEffect(() => {
    if (matchListQuery.isSuccess && matchListQuery.data) {
      const matchList = matchListQuery.data.map(({ id, title, description, event_id }) => ({
        id,
        title,
        description,
        event_id
      }))

      setMatchList(matchList)
    }
  }, [matchListQuery.status])

  useEffect(() => {
    if (!edit) {
      setTitle('')
      setThumbUrl('')
      setDate('')
      setDescription('')
      setSeason('')
    }
  }, [edit])

  async function handleSubmitEvent(e) {
    e.preventDefault()
    setShowError(false)

    if (!title || !date) {
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
        season_id: season,
      }
    })
      .then(() => {
        setTitle('')
        setThumbUrl('')
        setDate('')
        setDescription('')
        setSeason('')

        toast.success(
          edit ?
            "Evento atualizado com sucesso." :
            "Evento cadastrado com sucesso."
        )
        queryClient.removeQueries()
        // setRedirectTo('/admin/eventos')
      })
      .catch(err => {
        console.log(err)
        return toast.error("Houve algum erro ao fazer sua solicitação");
      }).finally(() => {
        setIsSubmitting(false)
      })
  }

  async function handleSubmitMatch(e) {
    e.preventDefault()

    const matchListId = matchList.map(({ id }) => id)

    setIsSubmitting(true)

    let breakMap = false
    let breakDeleteMap = false

    const loadingToastId = toast.loading('Processando alterações')

    await Promise.all(matchList.map(async (item) => {
      if (breakMap) return

      let param = 'create'

      if (item.id) {
        param = 'update'
      }

      await api.post(`/match/${param}`, {
        parameter: {
          ...item,
          event_id: eventId,
          guesses: [],
          wrestlers: [],
        }
      }).catch(err => {
        console.log(err)
        breakMap = true
      })
    }))

    if (!breakMap) {
      const excludedMatches = matchListQuery.data.filter(({ id }) => !matchListId.includes(id))

      await Promise.all(excludedMatches.map(async ({ id }) => {
        if (breakMap) return

        await api.delete(`/match/${id}`)
          .catch(err => {
            console.log(err)
            breakDeleteMap = true
          })
      }))

      queryClient.removeQueries()
    }

    if (!breakMap && !breakDeleteMap) {
      toast.update(loadingToastId, {
        render: 'As lutas foram alteradas com sucesso!',
        type: 'success',
        isLoading: false
      })
    } else {
      toast.update(loadingToastId, {
        render: 'Houve algum erro ao fazer sua solicitação',
        type: 'error',
        isLoading: false
      })
    }

    setIsSubmitting(false)
  }

  async function handleDelete() {
    setIsSubmitting(true)
    setShowError(false)

    await api.delete(`/event/${eventId}`)
      .then(() => {
        toast.success("Evento excluído com sucesso.")
        queryClient.removeQueries()
        setRedirectTo('/admin/Eventos')
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
    <AdminLayout title="Gerenciar eventos / Novo">
      <Card>
        {eventEditQuery.isLoading ? 'Carregando...' : (
          <>
            <form onSubmit={handleSubmitEvent}>
              <div className="text-lg font-semibold mb-2">Dados do evento</div>
              <Input
                required
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Digite o título do evento"
                isError={showError}
              />
              <Input
                type="url"
                name="thumb"
                onChange={(e) => setThumbUrl(e.target.value)}
                value={thumbUrl}
                placeholder="Digite o endereço (url) da thumbnail"
                isError={showError}
              />
              <Input
                required
                type="datetime-local"
                name="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                placeholder="Digite a data do evento"
                isError={showError}
              />
              <Input
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Digite uma descrição"
                isError={showError}
              />
              <Select
                onChange={(e) => setSeason(e.target.value)}
                value={season}
                items={[
                  {
                    value: '',
                    label: 'Selecione a temporada',
                    disabled: true
                  },
                ].concat(seasonListQuery.data?.length ? seasonListQuery.data : [])}
                isError={showError} />

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
          </>
        )}
      </Card>

      {edit && !eventEditQuery.isLoading ? (
        <>
          <hr className="my-6 border-zinc-800" />

          <Card>
            {matchListQuery.isLoading ? 'Carregando...' : (
              <>
                <form onSubmit={handleSubmitMatch}>
                  <div className="text-lg font-semibold mb-2">Card do evento</div>

                  {matchList.length === 0 ? (
                    <div className="my-4 text-zinc-400">Nenhuma luta foi adicionada para este evento</div>
                  ) : null}

                  {matchList.map((item, index) => {
                    return (
                      <div className="pb-2 mb-4 border-b border-zinc-800" key={index}>
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-semibold mb-2">Luta {index + 1}</div>
                          <button
                            type="button"
                            className="font-mono text-red-600 text-2xl"
                            onClick={() => {
                              const newMatchList = [...matchList]
                              newMatchList.splice(index, 1)
                              setMatchList(newMatchList)
                            }}
                          >x</button>
                        </div>
                        <div className="flex flex-nowrap items-center gap-4">
                          {/* title
                  description
                  event_id
                  guesses
                  wrestlers */}
                          <Input
                            required
                            fullWidth
                            type="text"
                            name={`match_title_` + index}
                            onChange={(e) => {
                              let newMatchList = [...matchList]
                              newMatchList[index] = { ...newMatchList[index], title: e.target.value }
                              setMatchList(newMatchList)
                            }}
                            value={item.title || ''}
                            placeholder="Digite o título da luta"
                            isError={showError}
                          />
                          <Input
                            fullWidth
                            type="text"
                            name={`match_description_` + index}
                            onChange={(e) => {
                              let newMatchList = [...matchList]
                              newMatchList[index] = { ...newMatchList[index], description: e.target.value }
                              setMatchList(newMatchList)
                            }}
                            value={item.description || ''}
                            placeholder="Digite uma descrição para a luta"
                            isError={showError}
                          />
                        </div>
                      </div>
                    )
                  })}

                  {matchList.length === 0 ? <hr className="my-6 border-zinc-800" /> : null}

                  <div className="flex justify-between items-center gap-2">
                    <Button
                      inline
                      type="button"
                      loading={isSubmitting}
                      onClick={() => setMatchList([...matchList, blankMatch])}>
                      + Adicionar luta
                    </Button>
                    <Button color="success" inline type="submit" loading={isSubmitting}>
                      Atualizar
                    </Button>
                  </div>

                  {showError && <div className="mt-4 text-center font-light text-base text-red-500">
                    Existem campos inválidos
                  </div>}
                </form>
              </>
            )}
          </Card>
        </>) : null}
    </AdminLayout>
  )
}

export default AdminAddEvent
