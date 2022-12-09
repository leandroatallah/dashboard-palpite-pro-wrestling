import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { LoginContext } from './context/authContext';
import AdminProtectedProvider from './components/Admin/ProtectedProvider';

import Home from './pages/Home'
import Guesses from './pages/Guesses'
import Events from './pages/Events'
import EventDetail from './pages/Events/Detail'
import Ranking from './pages/Ranking'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/Admin/Dashboard';
import AdminEventos from './pages/Admin/Events';
import AdminAddEvent from './pages/Admin/Events/new';
import AdminSeasons from './pages/Admin/Season';
import AdminAddSeason from './pages/Admin/Season/new';
import AdminUsers from './pages/Admin/Users';
import AdminAccount from './pages/Admin/Account';


const queryClient = new QueryClient()

function Private({ children }) {
  const { authenticated } = useContext(LoginContext)

  if (!authenticated) {
    return <Navigate replace to="/login" />
  }

  return <>{children}</>
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
            <Private>
              <AdminProtectedProvider>
                <AdminEventos />
              </AdminProtectedProvider>
            </Private>
          }
        />
        <Route
          path="/admin/eventos/novo"
          element={
            <Private>
              <AdminProtectedProvider>
                <AdminAddEvent />
              </AdminProtectedProvider>
            </Private>
          }
        />
        <Route
          path="/admin/temporadas"
          element={
            <Private>
              <AdminProtectedProvider>
                <AdminSeasons />
              </AdminProtectedProvider>
            </Private>
          }
        />
        <Route
          path="/admin/temporadas/novo"
          element={
            <Private>
              <AdminProtectedProvider>
                <AdminAddSeason />
              </AdminProtectedProvider>
            </Private>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <Private>
              <AdminProtectedProvider>
                <AdminUsers />
              </AdminProtectedProvider>
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
