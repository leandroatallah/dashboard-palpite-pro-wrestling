import { useContext } from 'react';
import { QueryClientProvider } from 'react-query'
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
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/Admin/Dashboard';
import AdminEventos from './pages/Admin/Events';
import AdminAddEvent from './pages/Admin/Events/form';
import AdminSeasons from './pages/Admin/Season';
import AdminAddSeason from './pages/Admin/Season/form';
import AdminUsers from './pages/Admin/Users';
import AdminAccount from './pages/Admin/Account';
import { isSuperUserAtom } from './store/atoms';
import { useAtom } from 'jotai';
import { queryClient } from './services/query'

function Private({ children, onlySuperUser }) {
  const { authenticated, handleLogout } = useContext(LoginContext)

  const [isSuperUser] = useAtom(isSuperUserAtom)

  if (!authenticated || (onlySuperUser && !isSuperUser)) {
    handleLogout()
    return <Navigate replace to="/login" />
  }


  return children
}

const App = () => (
  <QueryClientProvider client={queryClient}>
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
            <Private onlySuperUser>
              <AdminEventos />
            </Private>
          }
        />
        <Route
          path="/admin/eventos/novo"
          element={
            <Private onlySuperUser>
              <AdminAddEvent />
            </Private>
          }
        />
        <Route
          path="/admin/eventos/:id"
          element={
            <Private onlySuperUser>
              <AdminAddEvent edit />
            </Private>
          }
        />
        <Route
          path="/admin/temporadas"
          element={
            <Private onlySuperUser>
              <AdminSeasons />
            </Private>
          }
        />
        <Route
          path="/admin/temporadas/novo"
          element={
            <Private onlySuperUser>
              <AdminAddSeason />
            </Private>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <Private onlySuperUser>
              <AdminUsers />
            </Private>
          }
        />
        <Route
          path="/admin/perfil"
          element={
            <Private>
              <AdminAccount />
            </Private>
          }
        />

        <Route
          path="*"
          element={<Navigate replace to="/" />}
        />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)

export default App
