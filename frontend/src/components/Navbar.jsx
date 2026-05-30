import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'
import { useI18n } from '../context/I18nContext'
import { useNavigate, useLocation } from 'react-router-dom'

const navKeys = ['services', 'work', 'process', 'contact']

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  
  const { theme, toggle } = useTheme()
  const { lang, toggleLang, t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const isDark = theme === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })

    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 }
    )

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    
    if (location.pathname !== '/') {
      navigate('/' + (href === '#' ? '' : href))
      return
    }

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`nav ${scrolled ? 'nav--scrolled' : ''} ${menuOpen ? 'nav--open' : ''}`}
        aria-label="Main navigation"
      >
        <div className="nav__pill">
          {/* Logo */}
          <a href="#" className="nav__logo" onClick={(e) => handleLink(e, '#')}>
            Coding<span className="nav__logo-accent">Solver</span>
          </a>

          {/* Desktop links */}
          <div className="nav__links" role="list">
            {navKeys.map((key) => (
              <a
                key={key}
                href={`#${key === 'work' ? 'portfolio' : key}`}
                className="nav__link"
                role="listitem"
                onClick={(e) => handleLink(e, `#${key === 'work' ? 'portfolio' : key}`)}
              >
                {t(`nav.${key}`)}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="nav__actions">
            
            {/* Language switcher */}
            <button
              className="nav__theme-btn nav__lang-btn"
              onClick={toggleLang}
              aria-label="Toggle language"
              title={lang === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
              style={{ fontSize: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-mono)' }}
            >
              {lang.toUpperCase()}
            </button>

            {/* Theme toggle */}
            <button
              className="nav__theme-btn"
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              <span className="nav__theme-icon nav__theme-icon--sun">
                <SunIcon />
              </span>
              <span className="nav__theme-icon nav__theme-icon--moon">
                <MoonIcon />
              </span>
            </button>

            {/* CTA — desktop only */}
            <a
              href="#contact"
              className="nav__cta"
              onClick={(e) => handleLink(e, '#contact')}
            >
              {t('nav.getStarted')}
            </a>

            {/* Hamburger — mobile only */}
            <button
              className={`nav__hamburger ${menuOpen ? 'nav__hamburger--active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className="nav__ham-line" />
              <span className="nav__ham-line" />
              <span className="nav__ham-line" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`nav__mobile-overlay ${menuOpen ? 'nav__mobile-overlay--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {/* Close tap area */}
        <div className="nav__mobile-bg" onClick={() => setMenuOpen(false)} />

        <div className="nav__mobile-sheet">
          {/* Mobile header */}
          <div className="nav__mobile-header">
            <span className="nav__mobile-logo">
              Coding<span>Solver</span>
            </span>
            <button
              className="nav__mobile-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile links */}
          <nav className="nav__mobile-links">
            {navKeys.map((key, i) => (
              <a
                key={key}
                href={`#${key === 'work' ? 'portfolio' : key}`}
                className="nav__mobile-link"
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
                onClick={(e) => handleLink(e, `#${key === 'work' ? 'portfolio' : key}`)}
              >
                <span className="nav__mobile-link-num">0{i + 1}</span>
                {t(`nav.${key}`)}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </nav>

          {/* Mobile CTA */}
          <a
            href="#contact"
            className="nav__mobile-cta"
            onClick={(e) => handleLink(e, '#contact')}
          >
            {t('nav.startProject')}
          </a>
        </div>
      </div>
    </>
  )
}
