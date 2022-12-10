import { useContext } from 'react'
import { useQuery } from 'react-query'
import api from '../../../services/api'
import { LoginContext } from '../../../context/authContext'
import { isSuperUserAtom } from '../../../store/atoms'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const AdminProtectedProvider = ({ children }) => {
  const { handleLogout } = useContext(LoginContext)

  const [, setIsSuperUser] = useAtom(isSuperUserAtom)

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
    setIsSuperUser(getMeQuery.data?.isSuperuser)
  }, [getMeQuery.status])


  if (getMeQuery.isLoading) {
    return 'Carregando...'
  }

  return children
}

export default AdminProtectedProvider
