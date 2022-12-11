import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query';
import { queryClient } from './services/query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

import { AuthProvider } from './context/authContext';
import App from './app'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
    <ToastContainer position="bottom-left" autoClose="4000" />
  </React.StrictMode>
)
