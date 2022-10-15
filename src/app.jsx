import { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { LoginContext } from './context/authContext';

import Home from './pages/Home'
import Guesses from './pages/Guesses'
import Events from './pages/Events'
import EventDetail from './pages/Events/Detail'
import Ranking from './pages/Ranking'
import Account from './pages/Account'
import Login from './pages/Login'
import Signup from './pages/Signup'

function Private({ children }) {
  const { authenticated } = useContext(LoginContext)

  if (!authenticated) {
    return <Navigate replace to="/login" />
  }

  return <>{children}</>
}

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <Private>
            <Home />
          </Private>
        }
      />
      <Route
        path="/palpites"
        element={
          <Private>
            <Guesses />
          </Private>
        }
      />
      <Route
        path="/eventos/:id"
        element={
          <Private>
            <EventDetail />
          </Private>
        }
      />
      <Route
        path="/eventos"
        element={
          <Private>
            <Events />
          </Private>
        }
      />
      <Route
        path="/ranking"
        element={
          <Private>
            <Ranking />
          </Private>
        }
      />
      <Route
        path="/conta"
        element={
          <Private>
            <Account />
          </Private>
        }
      />
      <Route
        path="/login"
        element={<Login />}
        exact
      />
      <Route
        path="/signup"
        element={<Signup />}
        exact
      />
      <Route
        path="*"
        element={<Navigate replace to="/" />}
      />
    </Routes>
  </BrowserRouter>
)

export default App
