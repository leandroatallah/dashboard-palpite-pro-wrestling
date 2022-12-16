import { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { LoginContext } from '../../context/authContext'
import { Button, Input } from '../../components/Form'
import LayoutSignin from '../../components/LayoutSignin'
import { isEmailValid, isPasswordValid } from '../../utils'

const Login = () => {
  const { handleLogin } = useContext(LoginContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showError, setShowError] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setShowError(false)

    if (!isEmailValid(email) || !isPasswordValid(password)) {
      return setShowError(true)
    }

    setIsSubmitting(true)
    setShowError(false)

    const login = await handleLogin(email, password)

    setShowError(!login)
    setIsSubmitting(false)
  }

  return (
    <LayoutSignin callToAction={
      <><Link to="/signup" className="text-white font-semibold">Clique aqui</Link> para cadastrar</>
    }>
      <form onSubmit={handleSubmit}>
        <div className="text-3xl font-bold text-white text-center mt-4 mb-6 pt-4 border-t border-zinc-800">Acesso ao painel</div>
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
          Entrar
        </Button>

        {showError && <div className="mt-4 text-center font-light text-base text-red-500">
          Email e/ou senha inválidos
        </div>}
      </form>
    </LayoutSignin>
  )
}

export default Login;