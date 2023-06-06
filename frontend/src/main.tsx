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
      <section className='min-h-screen flex flex-col'>
        <header className="h-16 bg-white shadow-md sticky top-0 flex justify-center items-center p-10">
          <NavigationBar />
        </header>

        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/Employee/:id' element={<EmployeeProfile />} />
        </Routes>

        <footer className='mt-auto'>
          <Footer />
        </footer>
      </section>
    </React.StrictMode>
  </Router>,
)
