import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../context/I18nContext'

gsap.registerPlugin(ScrollTrigger)

// Hardcoded authors and initials for design purposes, merging with translated quotes
const authors = [
  { author: 'Rina Wijaya', role: 'CEO, TechFlow', initial: 'RW' },
  { author: 'Andi Pratama', role: 'Founder, StudioKreatif', initial: 'AP' },
  { author: 'Siti Nurhaliza', role: 'Owner, GreenLeaf', initial: 'SN' },
  { author: 'Budi Santoso', role: 'CTO, EventPro', initial: 'BS' },
  { author: 'Maya Putri', role: 'Director, Kreasi', initial: 'MP' },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const { t, tArray } = useI18n()

  const reviews = tArray('testimonials.reviews')
  
  // Merge reviews with author data (fallback if lengths don't match)
  const testimonials = reviews.map((r, i) => ({
    quote: r.text || r.quote || r,
    author: r.author || authors[i]?.author || 'Client',
    role: r.role || authors[i]?.role || 'Partner',
    initial: authors[i]?.initial || 'C'
  }))

  // Duplicate for seamless loop
  const allTestimonials = [...testimonials, ...testimonials]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="testimonials">
      <div className="container">
        <div ref={headerRef} className="testimonials__header">
          <span className="section-eyebrow">{t('testimonials.badge')}</span>
          <h2 className="section-heading">{t('testimonials.title')}</h2>
        </div>
      </div>

      <div className="testimonials__marquee-wrap">
        <div className="testimonials__marquee-track">
          {allTestimonials.map((t, i) => (
            <div key={`${t.author}-${i}`} className="testimonial-card">
              <div className="testimonial-card__quote-mark">"</div>
              <p className="testimonial-card__quote">{t.quote}</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.initial}</div>
                <div>
                  <div className="testimonial-card__author-name">{t.author}</div>
                  <div className="testimonial-card__author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
