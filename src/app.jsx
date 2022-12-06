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
import AdminDashboard from './pages/Admin/Dashboard';
import AdminEventos from './pages/Admin/Events';
import AdminAddEvent from './pages/Admin/Events/new';
import AdminUsers from './pages/Admin/Users';

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

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <Private>
            <AdminDashboard />
          </Private>
        }
      />
      <Route
        path="/admin/eventos"
        element={
          <Private>
            <AdminEventos />
          </Private>
        }
      />
      <Route
        path="/admin/eventos/novo"
        element={
          <Private>
            <AdminAddEvent />
          </Private>
        }
      />
      <Route
        path="/admin/usuarios"
        element={
          <Private>
            <AdminUsers />
          </Private>
        }
      />

      <Route
        path="*"
        element={<Navigate replace to="/" />}
      />
    </Routes>
  </BrowserRouter>
)

export default App
