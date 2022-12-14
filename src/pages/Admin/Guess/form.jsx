import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import { Button, Input, Select } from '../../../components/Form'
import api from '../../../services/api'
import { queryClient } from '../../../services/query';
import eventStatus from '../../../config/eventStatus.json'

const AdminAddGuess = ({ edit }) => {
  const [showError, setShowError] = useState(false)
  const [eventId, setEventId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [redirectTo, setRedirectTo] = useState(false)
  const [matchList, setMatchList] = useState([])

  const { id: guessId } = useParams()

  const guessEditQuery = useQuery('guess/id', async () => {
    return await api.get(`guess/${guessId}`)
      .then(({ data }) => data?.result)
      .catch(() => {
        toast.error("Houve algum erro ao fazer sua solicitação");
        setRedirectTo('/admin/palpites')
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!edit
  })

  const eventListQuery = useQuery('event/status_active', async () => {
    return await api.get(`event/?event_status=active`)
      .then(({ data }) => {
        const { result } = data
        return result.map(({ id, title }) => ({
          label: title,
          value: id,
        }))
      })
      .catch(() => {
        toast.error("Houve algum erro ao fazer sua solicitação");
        setRedirectTo('/admin/palpites')
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  const matchListQuery = useQuery('match/event_id', async () => {
    return await api.get(`match/?event_id=${eventId}`)
      .then(({ data }) => data?.result)
      .catch(() => {
        toast.error("Houve algum erro ao fazer sua solicitação");
        setRedirectTo('/admin/palpites')
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!eventId
  })

  // useEffect(() => {
  //   if (guessEditQuery.isSuccess && guessEditQuery.data) {
  //     const { title, thumb, date, description, season_id } = guessEditQuery.data

  //     setTitle(title)
  //     setThumbUrl(thumb)
  //     setDate(date)
  //     setDescription(description)
  //     setSeason(season_id)
  //   }
  // }, [guessEditQuery.status])

  // useEffect(() => {
  //   if (matchListQuery.isSuccess && matchListQuery.data) {
  //     const matchList = matchListQuery.data.map(({ id, title, description, event_id }) => ({
  //       id,
  //       title,
  //       description,
  //       event_id
  //     }))

  //     setMatchList(matchList)
  //   }
  // }, [matchListQuery.status])

  // useEffect(() => {
  //   if (!edit) {
  //     setTitle('')
  //     setThumbUrl('')
  //     setDate('')
  //     setDescription('')
  //     setSeason('')
  //   }
  // }, [edit])

  useEffect(() => {
    if (eventId) {
      matchListQuery.refetch()
    }
  }, [eventId])

  useEffect(() => {
    queryClient.removeQueries('guess')
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    // setShowError(false)

    // if (!title || !date) {
    //   return setShowError(true)
    // }

    // setIsSubmitting(true)
    // setShowError(false)

    // let param = 'create'

    // if (edit) {
    //   param = 'update'
    // }

    // await api.post(`/event/${param}`, {
    //   parameter: {
    //     id: guessId,
    //     title,
    //     description,
    //     date,
    //     thumb: thumbUrl,
    //     season_id: season,
    //   }
    // })
    //   .then(() => {
    //     setTitle('')
    //     setThumbUrl('')
    //     setDate('')
    //     setDescription('')
    //     setSeason('')

    //     toast.success(
    //       edit ?
    //         "Evento atualizado com sucesso." :
    //         "Evento cadastrado com sucesso."
    //     )
    //     queryClient.removeQueries()
    //     // setRedirectTo('/admin/eventos')
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     return toast.error("Houve algum erro ao fazer sua solicitação");
    //   }).finally(() => {
    //     setIsSubmitting(false)
    //   })
  }

  async function handleDelete() {
    // setIsSubmitting(true)
    // setShowError(false)

    // await api.delete(`/event/${guessId}`)
    //   .then(() => {
    //     toast.success("Palpite excluído com sucesso.")
    //     queryClient.removeQueries()
    //     setRedirectTo('/admin/palpites')
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     return toast.error("Houve algum erro ao fazer sua solicitação");
    //   }).finally(() => {
    //     setIsSubmitting(false)
    //   })
  }

  if (!!redirectTo) {
    return <Navigate to={redirectTo} />
  }

  return (
    <AdminLayout title="Gerenciar palpites / Novo">
      <Card>
        {eventListQuery.isLoading || guessEditQuery.isLoading ? 'Carregando...' : (
          <form onSubmit={handleSubmit}>
            <Select
              onChange={(e) => setEventId(e.target.value)}
              value={eventId}
              items={[
                {
                  value: '',
                  label: 'Selecione o evento',
                  disabled: true
                },
              ].concat(eventListQuery.data?.length ? eventListQuery.data : [])}
              isError={showError} />

            {eventId && !matchListQuery.isLoading ? (
              <>
                <hr className="my-6 border-zinc-800" />
                {matchListQuery.data?.length ? matchListQuery.data.map(({ title }, index) => (
                  <div className="" key={index}>
                    <div className="">Luta {index + 1}: {title}</div>
                    <Select
                      onChange={(e) => setEventId(e.target.value)}
                      value={eventId}
                      items={[
                        {
                          value: '',
                          label: 'Selecione o resultado',
                          disabled: true
                        },
                      ].concat(eventListQuery.data?.length ? eventListQuery.data : [])}
                      isError={showError} />
                  </div>
                )) : 'Carregando lutas...'}

                <div className="flex justify-end items-center gap-2">
                  <Button
                    color="success"
                    inline
                    type="submit"
                    loading={isSubmitting}
                  >
                    {edit ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                </div>
              </>
            ) : null}
          </form>
        )}

        {showError && <div className="mt-4 text-center font-light text-base text-red-500">
          Existem campos inválidos
        </div>}
      </Card>
    </AdminLayout>
  )
}

export default AdminAddGuess
