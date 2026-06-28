import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../context/I18nContext'
import BlurText from './BlurText'
import Typewriter from './Typewriter'

gsap.registerPlugin(ScrollTrigger)

const icons = [
  // Web Development (Layout/Browser)
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  // UI/UX Design (Layers)
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  // Backend Systems (Server)
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  )
]

// Fallback icon if array length mismatch
const defaultIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
)

export default function Services() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const { t, tArray } = useI18n()

  const serviceItems = tArray('services.items')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      const headerElements = Array.from(headerRef.current.children)
      
      gsap.fromTo(headerElements, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      )

      // Cards stacking animation
      const cards = gsap.utils.toArray('.service-card')
      
      cards.forEach((card) => {
        // 1. Animate card contents appearing when the card scrolls into view
        const contentElements = card.querySelectorAll('.service-card__icon-wrap, .service-card__arrow')
        
        // Use fromTo instead of from to avoid opacity stuck at 0 due to HMR or unmount bugs
        gsap.fromTo(contentElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Stacking effect only on desktop
      const mm = gsap.matchMedia()
      mm.add("(min-width: 769px)", () => {
        cards.forEach((card, index) => {
          if (index < cards.length - 1) {
            const nextCard = cards[index + 1]
            
            gsap.fromTo(card,
              { scale: 1, opacity: 1 },
              {
                scale: 0.9 + (index * 0.02), // Slightly different scale for depth
                opacity: 0.4,
                ease: 'none',
                scrollTrigger: {
                  trigger: nextCard,
                  start: 'top 80%', // When next card is coming up
                  end: 'top 140px', // When next card hits its sticky position
                  scrub: true,
                }
              }
            )
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="services">
      <div className="container">
        <div ref={headerRef} className="services__header">
          <span className="section-eyebrow">{t('services.badge')}</span>
          <h2 className="section-heading">{t('services.title')}</h2>
          <p className="section-subtitle">{t('services.subtitle')}</p>
        </div>

        <div ref={gridRef} className="services__grid">
          {serviceItems.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-card__icon-wrap">
                {icons[i] || defaultIcon}
              </div>
              <BlurText
                text={s.title}
                delay={80}
                animateBy="words"
                direction="top"
                className="service-card__title"
              />
              <Typewriter
                text={s.desc}
                delay={25}
                className="service-card__desc"
              />
              <div className="service-card__arrow">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
