import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SkeletonTheme } from "react-loading-skeleton";

import './index.css'
import App from './App.jsx'
import './css/auth.css';
import AuthContext from './features/auth/context/AuthContext.jsx';
import "react-loading-skeleton/dist/skeleton.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext><SkeletonTheme
  baseColor="#202020"
  highlightColor="#444"
>
  <App />
</SkeletonTheme></AuthContext>
    
  </StrictMode>,
)
