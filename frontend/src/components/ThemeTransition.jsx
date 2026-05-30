import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'

export default function ThemeTransition() {
  const { transitionData, completeTransition, finishTransition } = useTheme()
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!transitionData) return

    const ctx = gsap.context(() => {
      const { x, y, nextTheme } = transitionData
      const overlay = overlayRef.current
      
      // Calculate max radius needed to cover screen from the click point (x, y)
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
      
      // Determine the background color of the incoming theme
      const targetColor = nextTheme === 'light' ? '#f8f8f8' : '#000000'

      // Reset overlay state
      gsap.set(overlay, {
        backgroundColor: targetColor,
        clipPath: `circle(0px at ${x}px ${y}px)`,
        visibility: 'visible',
        opacity: 1
      })

      // Step 1: Expand circle (Open)
      gsap.to(overlay, {
        clipPath: `circle(${radius}px at ${x}px ${y}px)`,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => {
          // Step 2: Swap the actual CSS variables underneath
          completeTransition(nextTheme)
          
          // Wait a tiny bit for the DOM to repaint with new theme
          setTimeout(() => {
            // Step 3: Shrink the circle overlay to reveal the newly themed page (Close)
            gsap.to(overlay, {
              clipPath: `circle(0px at ${x}px ${y}px)`,
              duration: 0.7,
              ease: 'power3.inOut',
              onComplete: () => {
                gsap.set(overlay, { visibility: 'hidden' })
                finishTransition()
              }
            })
          }, 50)
        }
      })
    })

    return () => ctx.revert()
  }, [transitionData, completeTransition, finishTransition])

  return (
    <div 
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999, // Super high to cover absolutely everything
        visibility: 'hidden',
        pointerEvents: 'none',
        opacity: 0
      }}
      aria-hidden="true"
    />
  )
}
