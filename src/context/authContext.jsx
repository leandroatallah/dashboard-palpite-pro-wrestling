import { useState, useEffect } from 'react'
import { createContext } from 'react'
import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify';

import api from '../services/api'

export const LoginContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

    setLoading(false)
  }, [])

  async function handleLogin(email, password) {
    return await api.post('/user/login', {
      username: email,
      password
    }).then(async ({ data }) => {
      const { access_token } = data

      if (!access_token) {
        return false
      }

      localStorage.setItem('token', JSON.stringify(access_token))
      api.defaults.headers.Authorization = `Bearer ${access_token}`
      setAuthenticated(true)

      toast.success("Login efetuado com sucesso.");

      return true
    }).catch(() => {
      return toast.error("Houve algum erro ao fazer sua solicitação");
    })
  }

  async function handleSignup(email, password) {
    return await api.post('/user/signup', {
      email,
      password
    }).then(() => {
      toast.success("Usuário cadastrado com sucesso.", {
        pauseOnHover: false,
        autoClose: 3000,
      });
      return true
    })
      .catch((e) => {
        if (e.response.status === 400) {
          return toast.error("Este email não está disponível");
        }
        return toast.error("Houve algum erro ao fazer sua solicitação");
      })
  }

  function handleLogout() {
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    setAuthenticated(false)

    return redirect('/login')
  }

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <LoginContext.Provider value={{ authenticated, handleLogin, handleSignup, handleLogout }}>
      {children}
    </LoginContext.Provider>
  )
}
