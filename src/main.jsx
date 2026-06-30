import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Clear stale localStorage data when app version changes
const APP_VERSION = '1.3.0'
if (localStorage.getItem('vs_app_version') !== APP_VERSION) {
  localStorage.removeItem('vs_posts')
  localStorage.removeItem('vs_gallery')
  localStorage.removeItem('vs_hero')
  localStorage.removeItem('vs_site_content')
  localStorage.setItem('vs_app_version', APP_VERSION)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
