import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId = "671602920396-05s317r22f3vdaraggk5k0jpf53cj3se.apps.googleusercontent.com">
      <App/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
