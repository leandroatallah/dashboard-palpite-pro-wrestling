import { useState, useEffect, createContext } from 'react'
import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import api from '../../services/api'
import { isSuperUserAtom } from '../../store/atoms';
import { queryClient } from '../../services/query';

export const LoginContext = createContext()

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const [, setIsSuperUser] = useAtom(isSuperUserAtom)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token && isJsonString(token)) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    } else {
      handleLogout()
    }

    setLoading(false)
  }, [])

  async function handleLogin(email, password) {
    return await api.post('/user/login', {
      username: email,
      password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    },).then(async ({ data }) => {
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
      parameter: {
        email,
        password
      }
    }).then(() => {
      toast.success("Usuário cadastrado com sucesso.", {
        pauseOnHover: false,
        autoClose: 3000,
      });
      return true
    })
      .catch((e) => {
        if (e.response.status === 400) {
          toast.error("Este email não está disponível");
          return false
        }
        toast.error("Houve algum erro ao fazer sua solicitação");
        return false
      })
  }

  function handleLogout() {
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    setAuthenticated(false)
    setIsSuperUser(false)
    queryClient.removeQueries()
    queryClient.cancelQueries()
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
