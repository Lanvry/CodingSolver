import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import { motion } from 'motion/react'

export default function SubmitTestimonial() {
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!name.trim()) {
      setError('Name is required')
      setIsLoading(false)
      return
    }

    if (!comment.trim()) {
      setError('Feedback is required')
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch(`/api/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          role,
          rating,
          comment
        })
      })

      if (!res.ok) {
        throw new Error('Failed to submit testimonial')
      }

      setIsSuccess(true)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <title>{t('testimonials.submitTitle')} — Coding Solver</title>
      <meta name="description" content={t('testimonials.submitSubtitle')} />

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px 60px',
        background: 'var(--black)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Orbs */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--white-04) 0%, transparent 70%)',
          top: '-10%',
          right: '-10%',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--white-04) 0%, transparent 70%)',
          bottom: '-10%',
          left: '-10%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="contact__form-wrap"
          style={{ width: '100%', maxWidth: '500px', zIndex: 1 }}
        >
          {isSuccess ? (
            <div className="contact__success">
              <div className="contact__success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--white)', marginBottom: '12px' }}>
                {t('testimonials.formSuccess')}
              </h3>
              <p style={{ color: 'var(--white-50)', marginBottom: '32px', lineHeight: 1.6 }}>
                {t('testimonials.formSuccessDesc')}
              </p>
              <Link to="/" className="btn btn--primary" style={{ display: 'inline-flex', justifyContent: 'center' }}>
                {t('testimonials.backToHome')}
              </Link>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px', color: 'var(--white)', letterSpacing: '-0.02em' }}>
                {t('testimonials.submitTitle')}
              </h2>
              <p style={{ color: 'var(--white-50)', marginBottom: '32px', lineHeight: 1.5 }}>
                {t('testimonials.submitSubtitle')}
              </p>

              {error && (
                <div style={{
                  background: 'rgba(255,50,50,0.1)',
                  border: '1px solid rgba(255,50,50,0.3)',
                  color: '#ff6b6b',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  fontSize: '0.875rem'
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder={t('testimonials.formName')}
                    className="contact__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    placeholder={t('testimonials.formRole')}
                    className="contact__input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>

                <div className="input-group" style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--white-70)', marginBottom: '8px' }}>
                    {t('testimonials.formRating')}
                  </label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {[1, 2, 3, 4, 5].map((index) => {
                      const isActive = (hoverRating || rating) >= index
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setRating(index)}
                          onMouseEnter={() => setHoverRating(index)}
                          onMouseLeave={() => setHoverRating(0)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            transition: 'transform 0.2s ease',
                          }}
                          className="rating-star-btn"
                        >
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill={isActive ? 'var(--white)' : 'none'}
                            stroke={isActive ? 'var(--white)' : 'var(--white-30)'}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              transition: 'stroke 0.2s ease, fill 0.2s ease, transform 0.2s ease',
                              transform: (hoverRating || rating) === index ? 'scale(1.15)' : 'scale(1)'
                            }}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </button>
                      )
                    })}
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--white-50)', marginLeft: '8px' }}>
                      {rating} / 5
                    </span>
                  </div>
                </div>

                <div className="input-group">
                  <textarea
                    placeholder={t('testimonials.formComment')}
                    className="contact__input contact__textarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows="4"
                  />
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '32px' }}>
                  <button
                    type="submit"
                    className="btn btn--primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                    disabled={isLoading}
                  >
                    {isLoading ? t('testimonials.formSubmitting') : t('testimonials.formSubmit')}
                  </button>
                  <Link
                    to="/"
                    className="btn btn--ghost"
                    style={{ textDecoration: 'none', padding: '0 20px', height: '48px', display: 'flex', alignItems: 'center' }}
                  >
                    {t('testimonials.backToHome')}
                  </Link>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </>
  )
}
