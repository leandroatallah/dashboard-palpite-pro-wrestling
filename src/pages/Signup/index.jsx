import { useState, useContext } from 'react'
import { Link, redirect } from "react-router-dom"
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
      return redirect('/login')
    }
  }

  return (
    <LayoutSignin callToAction={
      <>Já possui conta? <Link to="/login" className="text-white font-semibold">Clique aqui</Link> para entrar</>
    }>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" disabled={isSubmitting}>
          Cadastrar
        </Button>
      </form>
    </LayoutSignin>
  )
}

export default Signup;