import { useContext } from 'react'
import { Link, Navigate } from "react-router-dom"
import { LoginContext } from '../../context/authContext'
import Card from '../../components/Card'
import logo from '../../assets/images/logo.svg'

const LayoutSignin = ({ children, callToAction }) => {
  const { authenticated } = useContext(LoginContext)

  if (authenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex-center flex-col h-screen">
      <Card className="max-w-[420px] w-full pb-10">
        <div className="mb-6">
          <img className="mx-auto" src={logo} alt="logo" />
        </div>

        {children}
      </Card>

      <div className="mt-1 pt-4 text-center text-zinc-400">
        {callToAction}
      </div>
    </div>
  )
}

export default LayoutSignin;