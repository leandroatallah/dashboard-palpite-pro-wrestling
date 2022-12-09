import { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import { LoginContext } from '../../context/authContext'

import user from '../../assets/images/user.jpg'
import bell from '../../assets/images/bell.svg'

const IconButton = ({ children, src, alt, ...rest }) => {
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
    label: 'Editar perfil',
    href: '/admin/perfil',
  },
]

const menuItemClasses = 'text-zinc-400 hover:text-white p-2 block w-full text-left'

const HeaderUser = () => {
  const { handleLogout } = useContext(LoginContext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="flex justify-end items-center gap-4 relative">
      <IconButton src={bell} alt="notifications" />
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-[60px] h-[60px] overflow-hidden rounded-lg">
        <img src={user} alt="user" />
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
