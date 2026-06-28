import React, { createContext, useContext, useState, useEffect } from 'react'

const PerformanceContext = createContext()

export function PerformanceProvider({ children }) {
  const [isLowEnd, setIsLowEnd] = useState(false)

  useEffect(() => {
    let lowEnd = false

    // Check user preference for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lowEnd = true
    }

    // Check hardware concurrency (number of logical processors)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      lowEnd = true
    }

    // Check device memory in GB (only available in chromium-based browsers)
    if (navigator.deviceMemory && navigator.deviceMemory <= 8) {
      lowEnd = true
    }

    // Optional override for testing purposes (e.g. ?lowend=true in URL)
    if (window.location.search.includes('lowend=true')) {
      lowEnd = true
    }

    setIsLowEnd(lowEnd)
  }, [])

  return (
    <PerformanceContext.Provider value={{ isLowEnd }}>
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformance() {
  return useContext(PerformanceContext)
}
