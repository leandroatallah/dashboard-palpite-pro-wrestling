import { Link, useLocation } from "react-router-dom"
import HeaderUser from '../HeaderUser'

import logo from '../../assets/images/logo.svg'

const menuItems = [
  { label: 'Início', href: "/" },
  { label: 'Palpites', href: "/palpites" },
  { label: 'Eventos', href: "/eventos" },
  { label: 'Ranking', href: "/ranking" },
]

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
        <div>
          <HeaderUser />
        </div>
      </div>
    </header>
  )
}

export default Header