import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { NavigationBar } from './components/NavigationBar.tsx'
import { Footer } from './components/Footer.tsx'
import { EmployeeProfile } from './pages/EmployeeProfile.tsx'
import UserProfile from './pages/UserProfile.tsx'
import Home from './pages/Home.tsx'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <React.StrictMode>
      <section className='min-h-screen flex flex-col'>
        <header className="h-16 bg-white shadow-md sticky top-0 p-10">
          <NavigationBar />
        </header>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/employees' element={<App />} />
          <Route path='/employees/:id' element={<EmployeeProfile />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/userprofile/:id' element={<UserProfile />} />
        </Routes>

        <footer className='mt-auto'>
          <Footer />
        </footer>
      </section>
    </React.StrictMode>
  </Router>,
)
