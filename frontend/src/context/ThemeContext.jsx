import { createContext, useContext, useState, useEffect, useRef } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('cs-theme') || 'dark'
  })
  
  const [transitionData, setTransitionData] = useState(null)
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('cs-theme', theme)
  }, [theme])

  const toggle = (e) => {
    // Prevent double clicking while transition is active
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // Get click coordinates (fallback to center if triggered via keyboard)
    const x = e?.clientX ?? window.innerWidth / 2
    const y = e?.clientY ?? window.innerHeight / 2
    
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    
    // Step 1: Start transition (circle expanding)
    setTransitionData({ x, y, nextTheme })
  }

  // Step 2: Actually change the DOM theme
  const completeTransition = (nextTheme) => {
    setTheme(nextTheme)
  }
  
  // Step 3: Cleanup after fade out
  const finishTransition = () => {
    setTransitionData(null)
    isAnimatingRef.current = false;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle, transitionData, completeTransition, finishTransition }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
