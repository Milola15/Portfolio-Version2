import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'

import Cursor   from './components/Cursor'
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import About    from './components/About'
import Skills   from './components/Skills'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Contact  from './components/Contact'
import Footer   from './components/Footer'
import Login     from './admin/Login'
import Dashboard from './admin/Dashboard'

function Portfolio({ isLight }) {
  return (
    <main>
      <Hero     isLight={isLight} />
      <About    isLight={isLight} />
      <Skills   isLight={isLight} />
      <Projects isLight={isLight} />
      <Timeline isLight={isLight} />
      <Contact  isLight={isLight} />
      <Footer   isLight={isLight} />
    </main>
  )
}

function App() {
  const { isLight, toggleTheme } = useTheme()

  return (
    <BrowserRouter>
      <div className={`min-h-screen relative overflow-hidden transition-colors duration-500
        ${isLight
          ? 'bg-[#fdf5f7]'
          : 'bg-gradient-to-br from-[#0d0306] via-[#2a0810] to-[#1a0a04]'
        }`}
      >
        <Cursor  isLight={isLight} />
        <Navbar  isLight={isLight} toggleTheme={toggleTheme} />
        

        <Routes>
          <Route path="/"          element={<Portfolio isLight={isLight} />} />
          <Route path="/admin"     element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App