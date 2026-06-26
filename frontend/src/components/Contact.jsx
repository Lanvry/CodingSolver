import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../context/I18nContext'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [sent, setSent] = useState(false)
  const sectionRef = useRef(null)
  const infoRef = useRef(null)
  const formRef = useRef(null)
  const { t } = useI18n()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([infoRef.current, formRef.current], {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Animate success
    gsap.to(e.currentTarget, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => setSent(true),
    })
  }

  return (
    <section id="contact" ref={sectionRef} className="contact">
      <div className="contact__bg-orb" />
      <div className="container">
        <div className="contact__inner">
          {/* Info side */}
          <div ref={infoRef} className="contact__info">
            <span className="section-eyebrow">{t('contact.badge')}</span>
            <h2 className="section-heading">{t('contact.title')}</h2>
            <p className="contact__text">
              {t('contact.subtitle')}
            </p>

            <div className="contact__details">
              <a href="mailto:codingsolver0@gmail.com" className="contact__detail">
                <span className="contact__detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span>codingsolver0@gmail.com</span>
              </a>

              <div className="contact__detail">
                <span className="contact__detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>{t('contact.info.locationValue')}</span>
              </div>

              <div className="contact__detail">
                <span className="contact__detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <span>Mon – Fri, 9AM – 6PM</span>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div ref={formRef} className="contact__form-wrap" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', padding: '40px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--white)' }}>Let's work together</h3>
            <p style={{ color: 'var(--white-70)', marginBottom: '16px', lineHeight: 1.6 }}>
              Feel free to reach out directly via email or phone. We're always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <a href="mailto:codingsolver0@gmail.com" className="btn btn--primary" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', fontSize: '1.1rem', width: '100%' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              codingsolver0@gmail.com
            </a>

            <a href="https://wa.me/6285730426264" target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', fontSize: '1.1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--white)', width: '100%' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              0857-3042-6264
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
