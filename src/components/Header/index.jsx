import { Link, useLocation } from "react-router-dom"

import logo from '../../assets/images/logo.svg'
import user from '../../assets/images/user.png'
import bell from '../../assets/images/bell.svg'

const menuItems = [
  { label: 'Início', href: "/" },
  { label: 'Palpites', href: "/palpites" },
  { label: 'Eventos', href: "/eventos" },
  { label: 'Ranking', href: "/ranking" },
]

const IconButton = ({ children, src, alt, ...rest }) => {
  return (
    <div className="flex-center w-10 h-10 rounded-full border-2 border-zinc-700 cursor-pointer hover:bg-zinc-700" {...rest}>
      <img className="inline-block" src={src} alt={alt} />
    </div>
  )
}

const Header = () => {
  const location = useLocation()

  return (
    <header className="py-4 px-4 lg:px-10 mb-3 bg-cardDark">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <span className="text-zinc-400">Temporada 01/2022</span>
        </div>
        <div>
          <nav>
            <ul className="list-none m-0 p-0 flex gap-6 lg:gap-12">
              {menuItems.map(({ label, href }) => (
                <li className="text-lg font-semibold" key={label}>
                  <Link to={href} className={`text-zinc-400 ${location?.pathname === href && 'text-white'} hover:text-white`}>{label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex justify-end items-center gap-4">
          <IconButton src={bell} alt="notifications" />
          <Link to="/conta">
            <img src={user} alt="user" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header