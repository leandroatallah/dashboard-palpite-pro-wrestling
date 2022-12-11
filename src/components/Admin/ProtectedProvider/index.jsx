import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import api from '../../../services/api'
import { LoginContext } from '../../../context/authContext'
import { isSuperUserAtom } from '../../../store/atoms'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const AdminProtectedProvider = ({ children, onlySuperUser }) => {
  const { handleLogout } = useContext(LoginContext)

  const [, setIsSuperUser] = useAtom(isSuperUserAtom)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      handleLogout()
    }
  }, [])

  const getMeQuery = useQuery('user/me', async () => {
    return await api.get('/user/me')
      .then(({ data }) => data?.result)
      .catch(() => {
        handleLogout()
      })
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!getMeQuery.isLoading) {
      setIsSuperUser(getMeQuery.data?.isSuperuser)
    }
  }, [getMeQuery.status])

  if (getMeQuery.isLoading) {
    return 'Carregando...'
  }

  if (!getMeQuery.isLoading && onlySuperUser && !getMeQuery.data?.isSuperuser) {
    return <Navigate replace to="/login" />
  }

  return children
}

export default AdminProtectedProvider
