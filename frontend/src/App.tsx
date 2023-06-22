// import './App.css'
import { Route, Routes } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import Home from './pages/Home';
import Hero from './pages/Hero';
import { EmployeeProfile } from './pages/EmployeeProfile';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserProfile from './pages/UserProfile';
import { Footer } from './components/Footer';
import { useStore } from './store/ZustandStore';

function App() {
  const { authenticated } = useStore();
  return (
    <main>
      <section className='min-h-screen flex flex-col'>
        <header className="bg-white shadow-md sticky top-0 p-3">
          <NavigationBar />
        </header>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/employees' element={<Hero />} />
          <Route path='/employees/:id' element={<EmployeeProfile />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          {authenticated && <Route path='/signin/userprofile/:id' element={<UserProfile />} />}
          <Route path='*' element={<Home />} />
        </Routes>

        <footer className='mt-auto'>
          <Footer />
        </footer>
      </section>
    </main>
  )
}

export default App;
