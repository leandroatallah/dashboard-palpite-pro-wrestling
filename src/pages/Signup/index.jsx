import { useState } from 'react'
import { Link } from "react-router-dom"
import Card from '../../components/Card'
import { Button, Input } from '../../components/Form'
import logo from '../../assets/images/logo.svg'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // ...

    setIsSubmitting(false)
  }

  return (
    <div className="flex-center h-screen">
      <Card className="max-w-[420px] w-full">
        <div className="mb-4">
          <img className="mx-auto" src={logo} alt="logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            required
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Digite seu email"
          />
          <Input
            required
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Digite sua senha"
          />
          <Button type="submit" disabled={isSubmitting}>
            Cadastrar
          </Button>

          <div className="mt-4 pt-4 border-0 border-t-2 border-zinc-800 text-center text-zinc-400">
            Já possui conta? <Link to="/login"><a className="text-white font-semibold">Clique aqui</a></Link> para entrar
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Signup;