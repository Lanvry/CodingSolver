import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null)
  const logoRef = useRef(null)
  const progressRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Reveal logo
    tl.to(logoRef.current, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.9,
      ease: 'power4.out',
    })

    // Fill progress bar
    .to(progressRef.current, {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut',
    }, '-=0.4')

    // Fade out and slide up preloader
    .to(rootRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.2,
      onComplete: () => {
        window.hasLoadedBefore = true
        if (onComplete) onComplete()
      },
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={rootRef} className="preloader">
      <div
        ref={logoRef}
        className="preloader__logo"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
      >
        Coding<span style={{ color: 'var(--nav-logo-accent)' }}>Solver</span>
      </div>
      <div ref={barRef} className="preloader__bar">
        <div ref={progressRef} className="preloader__progress" />
      </div>
    </div>
  )
}
