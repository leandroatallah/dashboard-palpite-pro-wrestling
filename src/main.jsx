import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home'
import Guesses from './pages/Guesses'
import Events from './pages/Events'
import EventDetail from './pages/Events/Detail'
import Ranking from './pages/Ranking'
import Account from './pages/Account'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/palpites" element={<Guesses />} />
        <Route path="/eventos/:id" element={<EventDetail />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/conta" element={<Account />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
