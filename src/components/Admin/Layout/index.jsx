import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import Card from '../../Card'
import SectionTitle from '../../SectionTitle'
import HeaderUser from '../../HeaderUser'

import api from '../../../services/api'
import { LoginContext } from '../../../context/authContext'

import logo from '../../../assets/images/logo.svg'

const menuItems = [
  { label: 'Dashboard', href: "/admin/dashboard" },
  {
    label: 'Eventos', items: [
      { label: 'Todos eventos', href: "/admin/eventos" },
      { label: 'Adicionar evento', href: "/admin/eventos/novo" },
    ]
  },
  {
    label: 'Usuários', items: [
      { label: 'Todos usuários', href: "/admin/usuarios" },
    ]
  },
]

const AdminLayout = ({ children, title }) => {
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

  return (
    <>
      <div className="flex flex-nowrap h-screen">
        <div className="w-[244px] max-w-full h-full">
          <Card className="rounded-none h-full">
            <nav>
              <div className="mb-4 pb-6 border-b border-zinc-800">
                <Link to="/admin">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <ul className="list-none m-0 p-0">
                {menuItems.map(({ label, href, items }) => (
                  <li className="text-lg" key={label}>
                    {items ? (
                      <>
                        <a className={`block p-2 text-zinc-400 ${location?.pathname === href && 'text-white'} hover:text-white`}>{label}
                        </a>
                        <ul className="list-none m-0 mb-2 p-0 pl-4">
                          {items.map(({ label, href }) => (
                            <li className="text-base" key={label}>
                              <Link to={href} className={`block p-1.5 text-zinc-400 ${location?.pathname === href && 'text-white'} hover:text-white`}>{label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link to={href} className={`block p-2 text-zinc-400 ${location?.pathname === href && 'text-white'} hover:text-white`}>{label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </Card>
        </div>
        <div className="w-[calc(100%-244px)]">
          <div className="p-6 px-10">
            <div className="flex justify-between items-center mb-10">
              <SectionTitle>{title}</SectionTitle>
              <HeaderUser />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout
