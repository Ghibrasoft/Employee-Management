import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { NavigationBar } from './components/NavigationBar.tsx'
import { Footer } from './components/Footer.tsx'
import { EmployeeProfile } from './profile/EmployeeProfile.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <React.StrictMode>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/Employee/:id' element={<EmployeeProfile />} />
      </Routes>
      <Footer />
    </React.StrictMode>
  </Router>,
)
