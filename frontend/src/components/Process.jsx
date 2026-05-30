import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../context/I18nContext'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const trackRef = useRef(null)
  const progressBarRef = useRef(null)
  const { t, tArray } = useI18n()

  const translatedSteps = tArray('process.steps')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      const headerEls = Array.from(headerRef.current.children)
      gsap.fromTo(headerEls,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        }
      )

      const stepEls = gsap.utils.toArray('.process-step', trackRef.current)
      const markerEls = gsap.utils.toArray('.process-step__marker', trackRef.current)
      const connectors = gsap.utils.toArray('.process-step__connector', trackRef.current)
      const connectorFills = gsap.utils.toArray('.process-step__connector-fill', trackRef.current)

      // Animate each step appearing
      stepEls.forEach((step, i) => {
        const content = step.querySelector('.process-step__content')
        gsap.fromTo(content,
          { x: 40, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 78%',
            }
          }
        )
      })

      // Activate each step marker and text when it hits the center of the screen
      stepEls.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 50%',
          onEnter: () => {
            // Activate marker
            gsap.to(markerEls[i], {
              scale: 1,
              backgroundColor: 'var(--white)',
              borderColor: 'var(--white)',
              boxShadow: '0 0 0 6px rgba(255,255,255,0.12), 0 0 20px rgba(255,255,255,0.3)',
              duration: 0.5,
              ease: 'back.out(1.4)',
            })
            const numEl = markerEls[i].querySelector('.process-step__num')
            if (numEl) gsap.to(numEl, { color: 'var(--black)', duration: 0.3 })

            // Activate step text
            step.classList.add('is-active')
          },
          onLeaveBack: () => {
            // De-activate marker when scrolled back up
            gsap.to(markerEls[i], {
              backgroundColor: 'var(--black)',
              borderColor: 'var(--glass-border)',
              boxShadow: 'none',
              duration: 0.4,
            })
            const numEl = markerEls[i].querySelector('.process-step__num')
            if (numEl) gsap.to(numEl, { color: 'var(--white-70)', duration: 0.3 })

            step.classList.remove('is-active')
          }
        })
      })

      // Animate connector lines with scrub (progress bar effect based on scroll)
      connectors.forEach((connector, i) => {
        gsap.fromTo(connectorFills[i],
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: connector,
              start: 'top 50%',
              end: 'bottom 50%',
              scrub: true,
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="process">
      <div className="container">
        <div ref={headerRef} className="process__header">
          <span className="section-eyebrow">{t('process.badge')}</span>
          <h2 className="section-heading">{t('process.title')}</h2>
          <p className="section-subtitle">{t('process.subtitle')}</p>
        </div>

        <div ref={trackRef} className="process__track">
          {translatedSteps.map((s, i) => (
            <div key={i} className="process-step">
              {/* Left: Marker + connector line */}
              <div className="process-step__left">
                <div className="process-step__marker">
                  <div className="process-step__marker-inner">
                    <span className="process-step__num">0{i + 1}</span>
                  </div>
                </div>
                {i < translatedSteps.length - 1 && (
                  <div className="process-step__connector">
                    <div className="process-step__connector-fill" />
                  </div>
                )}
              </div>

              {/* Right: Content */}
              <div className="process-step__content">
                <h3 className="process-step__title">{s.title}</h3>
                <p className="process-step__desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
