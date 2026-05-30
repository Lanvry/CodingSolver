import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'

import { ThemeProvider } from './context/ThemeContext'
import { I18nProvider } from './context/I18nContext'
import Preloader from './components/Preloader'
import LiquidCursor from './components/LiquidCursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThemeTransition from './components/ThemeTransition'
import Landing from './pages/Landing'
import ProjectDetails from './pages/ProjectDetails'

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

function AppContent() {
  const [loaded, setLoaded] = useState(false)
  const location = useLocation()

  useEffect(() => {
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
      lenis.destroy()
      gsap.ticker.remove(tickerFn)
      resizeObserver.disconnect()
    }
  }, [])

  // Refresh ScrollTrigger when route changes
  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  }, [location.pathname])

  return (
    <>
      <ScrollToTop />
      <div className="noise-overlay" aria-hidden="true" />
      <ThemeTransition />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <LiquidCursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/project/:repo" element={<ProjectDetails />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </I18nProvider>
    </ThemeProvider>
  )
}
