import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './css/auth.css';
import AuthContext from './features/auth/context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext><App /></AuthContext>
    
  </StrictMode>,
)
