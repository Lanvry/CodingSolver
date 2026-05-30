import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../context/I18nContext'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const projectStyles = [
  { bg: 'linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)', accentColor: 'rgba(255,255,255,0.12)' },
  { bg: 'linear-gradient(145deg, #0d0d0d 0%, #141414 100%)', accentColor: 'rgba(255,255,255,0.08)' },
  { bg: 'linear-gradient(145deg, #111111 0%, #0a0a0a 100%)', accentColor: 'rgba(255,255,255,0.1)' },
  { bg: 'linear-gradient(145deg, #0f0f0f 0%, #1c1c1c 100%)', accentColor: 'rgba(255,255,255,0.09)' },
  { bg: 'linear-gradient(145deg, #080808 0%, #151515 100%)', accentColor: 'rgba(255,255,255,0.15)' },
  { bg: 'linear-gradient(145deg, #141414 0%, #0c0c0c 100%)', accentColor: 'rgba(255,255,255,0.05)' },
]

export default function Portfolio() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const { t } = useI18n()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.github.com/users/CodeCraftersTeam01/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mappedProjects = data.map((repo, i) => {
            const date = new Date(repo.updated_at || repo.created_at)
            const year = date.getFullYear() || new Date().getFullYear()
            const style = projectStyles[i % projectStyles.length]
            const tags = repo.topics && repo.topics.length > 0 ? repo.topics.slice(0, 3) : []
            if (tags.length === 0 && repo.language) tags.push(repo.language)
            if (tags.length === 0) tags.push('Open Source')
            
            return {
              repoName: repo.name,
              title: repo.name.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
              category: repo.language || 'Repository',
              desc: repo.description || '',
              year: year.toString(),
              tags: tags,
              bg: style.bg,
              accentColor: style.accentColor,
              url: repo.homepage || repo.html_url,
              image: `https://opengraph.githubassets.com/1/CodeCraftersTeam01/${repo.name}`
            }
          })
          setProjects(mappedProjects)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch github repos', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (loading || projects.length === 0) return

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

      const cards = gridRef.current.querySelectorAll('.project-card')
      if (cards.length > 0) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [loading, projects])

  return (
    <section id="portfolio" ref={sectionRef} className="portfolio">
      <div className="container">
        <div ref={headerRef} className="portfolio__header">
          <span className="section-eyebrow">{t('portfolio.badge')}</span>
          <h2 className="section-heading">{t('portfolio.title')}</h2>
          <p className="section-subtitle">{t('portfolio.subtitle')}</p>
        </div>

        <div ref={gridRef} className="portfolio__grid">
          {loading ? (
            <div style={{ color: 'var(--white-50)', textAlign: 'center', gridColumn: '1 / -1', padding: '40px' }}>Loading projects from GitHub...</div>
          ) : projects.length === 0 ? (
            <div style={{ color: 'var(--white-50)', textAlign: 'center', gridColumn: '1 / -1', padding: '40px' }}>No projects found.</div>
          ) : (
            projects.map((p, index) => (
              <Link key={index} to={`/project/${p.repoName}`} className="project-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="project-card__visual" style={{ background: p.bg }}>
                  {p.image ? (
                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className="project-card__frame">
                      <div className="project-card__frame-bar">
                        <span style={{ background: '#ff5f57' }} />
                        <span style={{ background: '#febc2e' }} />
                        <span style={{ background: '#28c840' }} />
                      </div>
                      <div className="project-card__frame-body">
                        <div className="project-card__frame-line" style={{ width: '65%' }} />
                        <div className="project-card__frame-line" style={{ width: '42%' }} />
                        <div className="project-card__frame-divider" />
                        <div className="project-card__frame-grid">
                          <div className="project-card__frame-cell" />
                          <div className="project-card__frame-cell" />
                          <div className="project-card__frame-cell" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="project-card__glow" style={{ background: `radial-gradient(circle at 50% 50%, ${p.accentColor}, transparent 70%)` }} />
                </div>

                {/* Bottom info */}
                <div className="project-card__info-bottom">
                  <span className="project-card__category">{p.category} · {p.year}</span>
                  <h3 className="project-card__title">{p.title}</h3>
                </div>

                {/* Hover overlay */}
                <div className="project-card__overlay">
                  <div className="project-card__info-glass">
                    <span className="project-card__category">{p.category}</span>
                    <h3 className="project-card__title" style={{ marginBottom: '8px' }}>{p.title}</h3>
                    {p.desc && (
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--white-70)',
                        marginBottom: '12px',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {p.desc}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {p.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: 'rgba(255,255,255,0.7)',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
