import { useEffect } from 'react'
import { useQuery } from 'react-query'
import api from '../../services/api'
import { useAtom } from 'jotai'
import { isSuperUserAtom } from '../../store/atoms'
import Header from '../../components/Header'

function App(props) {
  const [, setIsSuperUser] = useAtom(isSuperUserAtom)
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

      if (result?.isSuperuser) {
        setIsSuperUser(result.isSuperuser)
      }
    }
  }, [getMeQuery.status])

  return (
    <div className="pb-10">
      <Header />

      <div className="xl:container mx-auto px-4">
        {props.children}
      </div>
    </div>
  )
}

export default App
