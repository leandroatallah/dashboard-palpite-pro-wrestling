import { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useAtom } from 'jotai'
import { LoginContext } from '../../context/authContext'
import bell from '../../assets/images/bell.svg'
import { currentUserEmailAtom } from '../../store/atoms'

const IconButton = ({ children, src, emailInitials, alt, ...rest }) => {
  return (
    <div className="flex-center w-10 h-10 rounded-full border-2 border-zinc-700 cursor-pointer hover:bg-zinc-700" {...rest}>
      <img className="inline-block" src={src} alt={alt} />
    </div>
  )
}

const menuItems = [
  {
    label: 'Painel',
    href: '/admin/dashboard',
  },
  {
    label: 'Palpites',
    href: "/admin/palpites"
  },
  {
    label: 'Editar perfil',
    href: '/admin/perfil',
  },
]

const menuItemClasses = 'text-zinc-400 hover:text-white p-2 block w-full text-left'

const HeaderUser = () => {
  const { handleLogout } = useContext(LoginContext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentUserEmail] = useAtom(currentUserEmailAtom)

  return (
    <div className="flex justify-end items-center gap-4 relative">
      {location?.pathname.includes('/admin/') ? (
        <ul className="list-none m-0 p-0 flex gap-6 lg:gap-12">
          <li className="text-lg font-semibold">
            <Link to="/" className="text-sm text-zinc-400 hover:text-white">Página inicial</Link>
          </li>
        </ul>
      ) : null}
      <IconButton src={bell} alt="notifications" />
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-[60px] h-[60px] overflow-hidden rounded-lg text-white uppercase font-bold text-2xl bg-green-600">
        {currentUserEmail?.slice(0, 2) || ''}
      </button>
      <div className={`bg-zinc-800 rounded-md py-3 px-4 absolute top-full right-0 min-w-[200px] ${isDropdownOpen ? 'block' : 'hidden'}`}>
        <ul>
          {menuItems.map(({ label, href }) => (
            <li key={href}>
              <Link to={href} className={menuItemClasses}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button type="text" onClick={handleLogout} className={menuItemClasses}>
              Sair
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderUser
