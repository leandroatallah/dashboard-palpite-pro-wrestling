import { useEffect, useState } from 'react'
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import { Button, Input } from '../../../components/Form'

const AdminAddEvent = () => {
  const [showError, setShowError] = useState(false)
  const [title, setTitle] = useState('')
  const [thumbUrl, setThumbUrl] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setShowError(false)

    if (!title || !thumbUrl || !date || !description) {
      return setShowError(true)
    }

    setIsSubmitting(true)
    setShowError(false)

    // add event
    alert('Evento adicionado')

    setIsSubmitting(false)
  }

  useEffect(() => {
    // Check if is super user
  }, [])

  return (
    <AdminLayout title="Gerenciar eventos / Novo">
      <Card>
        <form onSubmit={handleSubmit}>
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
            required
            type="url"
            name="thumb"
            onChange={(e) => setThumbUrl(e.target.value)}
            value={thumbUrl}
            placeholder="Digite o endereço (url) da thumbnail"
            isError={showError}
            errorText="Insira uma URL válida"
          />
          <Input
            required
            type="text"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            placeholder="Digite a data do evento"
            isError={showError}
          />
          <Input
            required
            type="date"
            name="date"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Digite uma descrição"
            isError={showError}
          />
          <Button type="submit" loading={isSubmitting}>
            Cadastrar
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
