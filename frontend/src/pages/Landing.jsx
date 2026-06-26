import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { useI18n } from '../context/I18nContext'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

export default function Landing() {
  const location = useLocation()
  const { t } = useI18n()

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const target = document.querySelector(location.hash)
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location.hash])

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://codingsolver.com'

  return (
    <>
      {/* React 19 Document Metadata Hoisting */}
      <title>{t('seo.home.title')}</title>
      <meta name="description" content={t('seo.home.description')} />
      <meta name="keywords" content={t('seo.home.keywords')} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t('seo.home.title')} />
      <meta property="og:description" content={t('seo.home.description')} />
      <meta property="og:url" content={origin} />
      <meta property="og:image" content={`${origin}/favicon.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t('seo.home.title')} />
      <meta name="twitter:description" content={t('seo.home.description')} />
      <meta name="twitter:image" content={`${origin}/favicon.png`} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebDevelopmentService",
          "name": "Coding Solver",
          "description": t('seo.home.description'),
          "url": origin,
          "logo": `${origin}/favicon.png`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jakarta",
            "addressCountry": "ID"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+62-857-3042-6264",
            "contactType": "customer service"
          }
        })}
      </script>

      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Contact />
      </motion.main>
    </>
  )
}
