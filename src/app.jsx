import { QueryClientProvider } from 'react-query'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
import AdminWrestlers from './pages/Admin/Wrestlers';
import AdminAddWrestler from './pages/Admin/Wrestlers/form';
import AdminSeasons from './pages/Admin/Season';
import AdminAddSeason from './pages/Admin/Season/form';
import AdminUsers from './pages/Admin/Users';
import AdminAccount from './pages/Admin/Account';
import { queryClient } from './services/query'
import AdminGuess from './pages/Admin/Guess';
import AdminAddGuess from './pages/Admin/Guess/form';
import Private from './components/Admin/ProtectedProvider';

const App = () => {
  return (
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
            path="/admin/lutadores"
            element={
              <Private onlySuperUser>
                <AdminWrestlers />
              </Private>
            }
          />
          <Route
            path="/admin/lutadores/novo"
            element={
              <Private onlySuperUser>
                <AdminAddWrestler />
              </Private>
            }
          />
          <Route
            path="/admin/lutadores/:id"
            element={
              <Private onlySuperUser>
                <AdminAddWrestler edit />
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
            path="/admin/temporadas/:id"
            element={
              <Private onlySuperUser>
                <AdminAddSeason edit />
              </Private>
            }
          />
          <Route
            path="/admin/palpites"
            element={
              <Private>
                <AdminGuess />
              </Private>
            }
          />
          <Route
            path="/admin/palpites/:id"
            element={
              <Private>
                <AdminAddGuess />
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
}

export default App
