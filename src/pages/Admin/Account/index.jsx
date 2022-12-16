import { useState } from 'react'
import AdminLayout from '../../../components/Admin/Layout'
import Card from '../../../components/Card'
import { Button, Input } from '../../../components/Form'
import { toast } from 'react-toastify';
import api from '../../../services/api';

const MINIMUM_PASSWORD_LENGTH = 6

const Conta = () => {
  const [showError, setShowError] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setShowError(false)

    if (!(password.length >= MINIMUM_PASSWORD_LENGTH)) {
      return setShowError(true)
    }

    if (password !== confirmPassword) {
      return setShowError(true)
    }

    setIsSubmitting(true)
    setShowError(false)

    await api.patch('/user/edit-password/', { parameter: { password } })
      .then(() => {
        setPassword('')
        setConfirmPassword('')
        toast.success("Senha alterada com sucesso.")
      })
      .catch(err => {
        console.log(err)
        return toast.error("Houve algum erro ao fazer sua solicitação");
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <AdminLayout title="Editar perfil">
      <Card>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">
            Senha nova
            <Input
              required
              id="password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Digite sua senha nova"
              isError={showError}
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirme sua senha nova
            <Input
              required
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirme sua senha nova"
              isError={showError}
            />
          </label>
          <Button color="success" type="submit" loading={isSubmitting}>
            Atualizar
          </Button>

          {showError && <div className="mt-4 text-center font-light text-base text-red-500">
            Existem campos inválidos
          </div>}
        </form>
      </Card>
    </AdminLayout>
  )
}

export default Conta;