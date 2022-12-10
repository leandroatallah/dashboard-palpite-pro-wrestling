import { Link } from 'react-router-dom'
import Card from '../../Card'
import SectionTitle from '../../SectionTitle'
import HeaderUser from '../../HeaderUser'
import { isSuperUserAtom } from '../../../store/atoms'
import { useAtom } from 'jotai'
import AdminProtectedProvider from '../../Admin/ProtectedProvider'

import logo from '../../../assets/images/logo.svg'

const menuItems = [
  { label: 'Dashboard', href: "/admin/dashboard" },
  {
    label: 'Eventos', onlySuperUser: true, items: [
      { label: 'Todos', href: "/admin/eventos" },
      { label: 'Adicionar novo', href: "/admin/eventos/novo" },
    ]
  },
  {
    label: 'Temporadas', onlySuperUser: true, items: [
      { label: 'Todas', href: "/admin/temporadas" },
      { label: 'Adicionar nova', href: "/admin/temporadas/novo" },
    ]
  },
  { label: 'Usuários', onlySuperUser: true, href: "/admin/usuarios" },
  { label: 'Perfil', href: "/admin/perfil" },
]

const AdminLayout = ({ children, title }) => {
  const [isSuperUser] = useAtom(isSuperUserAtom)

  return (
    <AdminProtectedProvider>
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
                {menuItems.map(({ label, href, items, onlySuperUser }) => {
                  if (onlySuperUser && !isSuperUser) {
                    return null
                  }

                  return (
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
                  )
                })}
              </ul>
            </nav>
          </Card>
        </div>
        <div className="w-[calc(100%-244px)]">
          <div className="p-6 px-10 min-h-screen">
            <div className="flex justify-between items-center mb-10">
              <SectionTitle>{title}</SectionTitle>
              <HeaderUser />
            </div>
            {children}
          </div>
        </div>
      </div>
    </AdminProtectedProvider>
  )
}

export default AdminLayout
