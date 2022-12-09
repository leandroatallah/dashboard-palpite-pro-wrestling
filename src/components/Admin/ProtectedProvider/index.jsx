import { useEffect, useContext } from 'react'
import { useQuery } from 'react-query'

import api from '../../../services/api'
import { LoginContext } from '../../../context/authContext'

const AdminProtectedProvider = ({ children }) => {
  const { handleLogout } = useContext(LoginContext)

  const getMeQuery = useQuery('user/me', async () => {
    return await api.get('/user/me')
      .then(({ data }) => data)
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (getMeQuery?.data) {
      const { result } = getMeQuery.data
      if (!result?.isSuperuser) {
        handleLogout()
      }
    }
  }, [getMeQuery.status])

  if (getMeQuery.isLoading) {
    return 'Carregando...'
  }

  return children
}

export default AdminProtectedProvider
