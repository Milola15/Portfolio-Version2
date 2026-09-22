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
  ? 'bg-[#f5e8eb]'
  : 'bg-gradient-to-br from-[#1a0508] via-[#3d0f1e] to-[#2a0810]'
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