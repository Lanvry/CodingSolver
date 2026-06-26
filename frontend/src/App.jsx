import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'

import { ThemeProvider } from './context/ThemeContext'
import { I18nProvider } from './context/I18nContext'
import { PerformanceProvider, usePerformance } from './context/PerformanceContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Navigate } from 'react-router-dom'
import Preloader from './components/Preloader'
import LiquidCursor from './components/LiquidCursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThemeTransition from './components/ThemeTransition'
import Landing from './pages/Landing'
import ProjectDetails from './pages/ProjectDetails'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import './index.css'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppContent() {
  const [loaded, setLoaded] = useState(false)
  const location = useLocation()
  const { isLowEnd } = usePerformance()
  
  const showLandingLayout = location.pathname === '/' || location.pathname.startsWith('/project')

  useEffect(() => {
    if (isLowEnd) {
      gsap.ticker.fps(30) // Reduce GSAP framerate on potato PCs
      return
    }

    // Reset fps to unthrottled for high-end PCs
    gsap.ticker.fps(0) 

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    const tickerFn = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)

    // Automatically refresh ScrollTrigger when page height changes (e.g. Portfolio images load)
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh()
    })
    resizeObserver.observe(document.body)

    return () => {
      if (!isLowEnd) {
        lenis.destroy()
        gsap.ticker.remove(tickerFn)
      }
      resizeObserver.disconnect()
    }
  }, [isLowEnd])

  // Refresh ScrollTrigger when route changes
  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  }, [location.pathname])

  return (
    <>
      <ScrollToTop />
      {!isLowEnd && <div className="noise-overlay" aria-hidden="true" />}
      <ThemeTransition />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      {!isLowEnd && <LiquidCursor />}
      {showLandingLayout && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/project/:repo" element={<ProjectDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </AnimatePresence>
      {showLandingLayout && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <PerformanceProvider>
          <BrowserRouter>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </BrowserRouter>
        </PerformanceProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
