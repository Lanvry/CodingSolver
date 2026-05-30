import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function LiquidCursor() {
  const cursorRef = useRef(null)
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const currentRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const rafRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Hide default cursor on desktop
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) {
      cursor.style.display = 'none'
      return
    }

    document.documentElement.style.cursor = 'none'

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      // Make cursor visible on first move
      if (!cursor.classList.contains('cursor--visible')) {
        cursor.classList.add('cursor--visible')
      }
    }

    const onEnterInteractive = () => {
      cursor.classList.add('cursor--expanded')
    }

    const onLeaveInteractive = () => {
      cursor.classList.remove('cursor--expanded')
      cursor.classList.remove('cursor--text')
    }

    const onEnterText = () => {
      cursor.classList.add('cursor--text')
      cursor.classList.remove('cursor--expanded')
    }

    // Smooth follow with lerp
    const lerp = (a, b, t) => a + (b - a) * t
    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, 0.12)
      currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, 0.12)
      gsap.set(cursor, {
        x: currentRef.current.x,
        y: currentRef.current.y,
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMove, { passive: true })

    const onMouseOver = (e) => {
      const target = e.target
      if (!target || !target.closest) return

      if (target.closest('a, button, .service-card, .project-card, .file-explorer__row--clickable, .project-tag')) {
        cursor.classList.add('cursor--expanded')
      } else if (target.closest('input, textarea')) {
        cursor.classList.add('cursor--text')
      }
    }

    const onMouseOut = (e) => {
      const target = e.target
      if (!target || !target.closest) return

      if (target.closest('a, button, .service-card, .project-card, .file-explorer__row--clickable, .project-tag')) {
        cursor.classList.remove('cursor--expanded')
      } else if (target.closest('input, textarea')) {
        cursor.classList.remove('cursor--text')
      }
    }

    // Use event delegation to handle dynamic elements (like React Router pages)
    document.body.addEventListener('mouseover', onMouseOver, { passive: true })
    document.body.addEventListener('mouseout', onMouseOut, { passive: true })

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.body.removeEventListener('mouseover', onMouseOver)
      document.body.removeEventListener('mouseout', onMouseOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <div ref={cursorRef} className="cursor" aria-hidden="true" />
}
