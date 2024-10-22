import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Sidebar from './components/Sidebar/Sidebar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sidebar/>
    <App />
  </StrictMode>,
)
