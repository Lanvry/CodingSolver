import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useI18n } from '../context/I18nContext'

// Register if available (GSAP Club), otherwise use manual split
let hasSplitText = false
try {
  gsap.registerPlugin(SplitText)
  hasSplitText = true
} catch (_) {}

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const badgeRef = useRef(null)
  const actionsRef = useRef(null)
  const statsRef = useRef(null)
  const scrollRef = useRef(null)
  const { t } = useI18n()

  const [statsData, setStatsData] = useState({
    projects_delivered: '50+',
    client_satisfaction: '98%',
    years_experience: '3+'
  })

  useEffect(() => {
    fetch(`/api/public/stats`)
      .then(res => res.json())
      .then(data => {
        if (data && data.projects_delivered) {
          setStatsData(data)
        }
      })
      .catch(err => console.error('Failed to fetch public stats', err))
  }, [])

  const stats = [
    { value: statsData.projects_delivered, label: t('hero.stat1') },
    { value: statsData.client_satisfaction, label: t('hero.stat2') },
    { value: statsData.years_experience, label: t('hero.stat3') },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isInitial = !window.hasLoadedBefore
      const initialDelay = isInitial ? 2.6 : 0.2
      const tl = gsap.timeline({ delay: initialDelay })

      // Badge
      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        immediateRender: true,
      })

      // Title words
      const words = titleRef.current.querySelectorAll('.hero__title-word')
      tl.from(words, {
        y: '110%',
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power4.out',
        immediateRender: true,
      }, '-=0.3')

      // Subtitle
      tl.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        immediateRender: true,
      }, '-=0.4')

      // Actions
      tl.from(actionsRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: true,
      }, '-=0.4')

      // Stats
      tl.from(statsRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: true,
      }, '-=0.3')

      // Scroll indicator
      gsap.from(scrollRef.current, {
        opacity: 0,
        y: -10,
        duration: 1,
        ease: 'power2.out',
        delay: 2,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero" id="home">
      {/* Background */}
      <div className="hero__bg">
        <div className="hero__grid-lines" />
        <div className="hero__gradient-orb hero__gradient-orb--1" />
        <div className="hero__gradient-orb hero__gradient-orb--2" />
      </div>

      <div className="hero__inner">
        {/* Badge */}
        <div ref={badgeRef} className="hero__badge">
          <span className="hero__badge-pulse" />
          {t('hero.badge').replace('50+', statsData.projects_delivered)}
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="hero__title">
          <span className="hero__title-line">
            <span className="hero__title-word">{t('hero.title1')}</span>{' '}
            <span className="hero__title-word hero__title-gradient">{t('hero.title2')}</span>
          </span>
          <span className="hero__title-line">
            <span className="hero__title-word">{t('hero.title3')}</span>{' '}
            <span className="hero__title-word hero__title-gradient">{t('hero.title4')}</span>
          </span>
          <span className="hero__title-line">
            <span className="hero__title-word">{t('hero.title5')}</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="hero__subtitle">
          {t('hero.subtitle')}
        </p>

        {/* Actions */}
        <div ref={actionsRef} className="hero__actions">
          <a href="#contact" className="btn btn--primary btn--large">
            {t('hero.btnStart')}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#portfolio" className="btn btn--ghost btn--large">
            {t('hero.btnView')}
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="hero__stats">
          {stats.map((s) => (
            <div key={s.label} className="hero__stat">
              <div className="hero__stat-value">{s.value}</div>
              <div className="hero__stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="hero__scroll-indicator">
        <span className="hero__scroll-text">{t('hero.scroll')}</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

