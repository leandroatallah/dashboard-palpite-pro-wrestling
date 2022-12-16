import { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { LoginContext } from '../../context/authContext'
import { Button, Input } from '../../components/Form'
import LayoutSignin from '../../components/LayoutSignin'
import { isEmailValid, isPasswordValid } from '../../utils'

const Signup = () => {
  const { handleSignup } = useContext(LoginContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showError, setShowError] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setShowError(false)

    if (!isEmailValid(email) || !isPasswordValid(password)) {
      return setShowError(true)
    }

    setIsSubmitting(true)
    setShowError(false)

    const login = await handleSignup(email, password)

    setShowError(!login)
    setIsSubmitting(false)

    if (login) {
      setSuccessMessage(true)
    }
  }

  return (
    <LayoutSignin callToAction={
      !successMessage && <>Já possui conta? <Link to="/login" className="text-white font-semibold">Clique aqui</Link> para entrar</>
    }>
      {successMessage ? (
        <div className="text-center">
          <h2 className="text-xl font-black mb-3">Cadastro realizado com sucesso!</h2>
          <div><Link to="/login" className="font-semibold text-red-500">Clique aqui</Link> para entrar</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="text-3xl font-bold text-white text-center mt-4 mb-6 pt-4 border-t border-zinc-800">Novo cadastro</div>
          <Input
            required
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Digite seu email"
            isError={showError && !isEmailValid(email)}
            errorText="Insira um email válido"
          />
          <Input
            required
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Digite sua senha"
            isError={showError && !isPasswordValid(password)}
            errorText="A senha deve ter pelo menos 6 caracteres"
          />
          <Button color="success" type="submit" loading={isSubmitting}>
            Cadastrar
          </Button>
        </form>
      )}
    </LayoutSignin>
  )
}

export default Signup;