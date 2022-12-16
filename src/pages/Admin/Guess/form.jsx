import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment'
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import { Button, Select } from '../../../components/Form'
import api from '../../../services/api'
import { queryClient } from '../../../services/query';

const AdminAddGuess = ({ edit }) => {
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [redirectTo, setRedirectTo] = useState(false)
  const [guessList, setGuessList] = useState([])

  const { id: eventId } = useParams()

  const eventEditQuery = useQuery('event/id', async () => {
    return await api.get(`event/${eventId}`)
      .then(({ data }) => data?.result)
      .catch(() => {
        toast.error("Houve algum erro ao fazer sua solicitação");
        setRedirectTo('/admin/palpites')
      })
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  const guessListQuery = useQuery('guess/event_id', async () => {
    return await api.get(`guess/${eventId}`)
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

  const wrestlerListQuery = useQuery('wrestler/', async () => {
    return await api.get(`wrestler/`)
      .then(({ data }) => {
        const { result } = data
        return result.map(({ id, name }) => ({
          label: name,
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
    if (guessListQuery.isSuccess && guessListQuery.data?.length) {
      setGuessList(guessListQuery.data)
    }
  }, [guessListQuery.status])

  useEffect(() => {
    if (!edit) {
      setGuessList([])
    }
  }, [edit])

  useEffect(() => {
    if (eventId) {
      matchListQuery.refetch()
    }
  }, [eventId])

  useEffect(() => {
    queryClient.removeQueries('guess')

    return () => {
      queryClient.removeQueries()
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setShowError(false)

    if (!eventId) {
      return setShowError(true)
    }

    setIsSubmitting(true)
    setShowError(false)

    let breakMap = false
    const loadingToastId = toast.loading('Processando alterações')

    await Promise.all(guessList.map(async (item) => {
      if (breakMap) return

      let param = 'create'

      if (item.id) {
        param = 'update'
      }

      await api.post(`/guess/${param}`, {
        parameter: {
          ...item,
          event_id: parseInt(eventId),
          match_id: item.match_id,
          winner_id: item.winner_id,
          result: item.result,
        }
      })
        .catch(err => {
          console.log(err)
          breakMap = true
        })
    }))

    if (!breakMap) {
      toast.update(loadingToastId, {
        render: 'Os palpites foram criados com sucesso!',
        type: 'success',
        isLoading: false,
        autoClose: 4000,
      })
    } else {
      toast.update(loadingToastId, {
        render: 'Houve algum erro ao fazer sua solicitação',
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      })
    }

    setIsSubmitting(false)
  }

  if (!!redirectTo) {
    return <Navigate to={redirectTo} />
  }

  return (
    <AdminLayout title="Gerenciar palpites / Novo">
      <Card>
        {eventEditQuery.isLoading ? 'Carregando...' : (
          <form onSubmit={handleSubmit}>
            <div className="text-2xl font-bold">{`${eventEditQuery.data.title} (${moment(eventEditQuery.data.date).format('l')})`}</div>

            {!matchListQuery.isLoading && !guessListQuery.isLoading ? (
              <>
                <hr className="my-6 border-zinc-800" />
                {matchListQuery.data?.length ? matchListQuery.data.map(({ id: matchId, title, wrestler_one_id, wrestler_two_id }, index) => {
                  const wrestlerList = wrestlerListQuery.data?.length ? wrestlerListQuery.data : []
                  const wrestlersOptions = wrestlerList
                    .filter((item) => [wrestler_one_id, wrestler_two_id].includes(item.value))
                    .map(({ label, value }) => {
                      return ({
                        label: `Vitória de ${label}`,
                        value,
                      })
                    })

                  const renderedResult = guessList.find((item) => item.match_id === matchId)

                  return (
                    <div className="" key={index}>
                      <div className="">Luta {index + 1}: {title}</div>
                      <Select
                        onChange={(e) => {
                          const { value } = e.target
                          let newGuessList = [...guessList]
                          let result = "normal"
                          let winner_id = null

                          if (value === "no_contest" || value === "draw") {
                            result = value
                          } else {
                            winner_id = parseInt(value)
                          }

                          newGuessList[index] = {
                            ...newGuessList[index],
                            match_id: matchId,
                            winner_id,
                            result,
                          }

                          setGuessList(newGuessList)
                        }}
                        value={renderedResult?.winner_id || renderedResult?.result}
                        items={[
                          {
                            value: '',
                            label: 'Selecione o resultado',
                            disabled: true
                          },
                        ]
                          .concat(wrestlersOptions)
                          .concat(
                            {
                              label: 'Empate',
                              value: 'draw'
                            },
                            {
                              label: 'Sem resultado',
                              value: 'no_contest'
                            },)}
                        isError={showError} />
                    </div>)
                }) : 'Carregando lutas...'}

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
            ) : 'Carregando...'}
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
