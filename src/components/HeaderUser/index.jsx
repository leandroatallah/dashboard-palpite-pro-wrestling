import { useContext } from 'react'
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

const HeaderUser = () => {
    const { handleLogout } = useContext(LoginContext)

    return (
        <div className="flex justify-end items-center gap-4">
            <IconButton src={bell} alt="notifications" />
            <Link to="/conta" className="w-[60px] h-[60px] overflow-hidden rounded-lg">
                <img src={user} alt="user" />
            </Link>
            <button onClick={handleLogout}>Sair</button>
        </div>
    )
}

export default HeaderUser
