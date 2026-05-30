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
              <a href="mailto:hello@codingsolver.com" className="contact__detail">
                <span className="contact__detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span>hello@codingsolver.com</span>
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
          <div ref={formRef} className="contact__form-wrap">
            {sent ? (
              <div className="contact__success">
                <div className="contact__success-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3>{t('contact.form.submit')} Success!</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="contact__row" style={{ marginBottom: 0 }}>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder={t('contact.form.name')}
                      className="contact__input"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder={t('contact.form.email')}
                      className="contact__input"
                      required
                    />
                  </div>
                </div>
                <div className="input-group">
                  <textarea
                    placeholder={t('contact.form.message')}
                    className="contact__input contact__textarea"
                    rows={5}
                    required
                  />
                </div>
                <button type="submit" className="btn btn--primary contact__submit">
                  {t('contact.form.submit')}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
