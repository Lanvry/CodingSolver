import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Folder, File, ArrowLeft, ExternalLink } from 'lucide-react'
import { useI18n } from '../context/I18nContext'
import { motion } from 'motion/react'

export default function ProjectDetails() {
  const { repo } = useParams()
  const [repoData, setRepoData] = useState(null)
  const [contents, setContents] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPath, setCurrentPath] = useState('')
  const { t } = useI18n()
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'CodeCraftersTeam01';

  useEffect(() => {
    // Reset state when repo changes
    setLoading(true)
    setCurrentPath('')
    
    // Fetch Repo Details
    fetch(`/api/github/repos/${username}/${repo}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          // Fallback if rate limited or not found
          setRepoData({
            name: repo.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
            description: `A project by ${username}`,
            language: 'Code',
            html_url: `https://github.com/${username}/${repo}`,
            homepage: '#'
          })
        } else {
          setRepoData(data)
        }
      })
      .catch(err => {
        console.error(err)
        setRepoData({
            name: repo.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
            description: `A project by ${username}`,
            language: 'Code',
            html_url: `https://github.com/${username}/${repo}`,
            homepage: '#'
        })
      })

  }, [repo])

  useEffect(() => {
    setLoading(true)
    const pathQuery = currentPath ? `/${currentPath}` : ''
    fetch(`/api/github/repos/${username}/${repo}/contents${pathQuery}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        // Sort: directories first, then files
        const sorted = Array.isArray(data) ? data.sort((a, b) => {
          if (a.type === b.type) return a.name.localeCompare(b.name)
          return a.type === 'dir' ? -1 : 1
        }) : []
        setContents(sorted)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        // Fallback dummy files if rate limited or not found
        if (!currentPath) {
          setContents([
            { name: 'src', type: 'dir', path: 'src', sha: '1' },
            { name: 'public', type: 'dir', path: 'public', sha: '2' },
            { name: 'README.md', type: 'file', size: 1024, sha: '3' },
            { name: 'package.json', type: 'file', size: 512, sha: '4' }
          ])
        } else {
          setContents([])
        }
        setLoading(false)
      })
  }, [repo, currentPath])

  const handleNavigate = (item) => {
    if (item.type === 'dir') {
      setCurrentPath(item.path)
    } else {
      window.open(item.html_url, '_blank')
    }
  }

  const goBack = () => {
    if (!currentPath) return
    const parts = currentPath.split('/')
    parts.pop()
    setCurrentPath(parts.join('/'))
  }

  return (
    <motion.div 
      className="project-details"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        
        {/* Header Section */}
        <div className="project-details__header">
          <Link to="/" className="project-details__back">
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          {repoData && (
            <div className="project-details__title-group">
              <h1 className="project-details__title">{repoData.name}</h1>
              {repoData.description && (
                <p className="project-details__desc">{repoData.description}</p>
              )}
              <div className="project-details__tags">
                {repoData.language && (
                  <span className="project-tag">{repoData.language}</span>
                )}
                <a href={repoData.html_url} target="_blank" rel="noopener noreferrer" className="project-tag project-tag--link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  View on GitHub
                </a>
                {repoData.homepage && (
                  <a href={repoData.homepage} target="_blank" rel="noopener noreferrer" className="project-tag project-tag--link">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* File Explorer */}
        <div className="file-explorer">
          <div className="file-explorer__header">
            <div className="file-explorer__path">
              {username} / {repo} {currentPath ? `/ ${currentPath}` : ''}
            </div>
          </div>
          
          <div className="file-explorer__body">
            {loading ? (
              <div className="file-explorer__loading">Loading files...</div>
            ) : (
              <table className="file-explorer__table">
                <tbody>
                  {currentPath && (
                    <tr onClick={goBack} className="file-explorer__row file-explorer__row--clickable">
                      <td className="file-explorer__cell-icon">
                        <Folder size={18} fill="var(--white-50)" color="var(--white-50)" />
                      </td>
                      <td className="file-explorer__cell-name">..</td>
                      <td className="file-explorer__cell-size"></td>
                    </tr>
                  )}
                  {contents.map((item) => (
                    <tr 
                      key={item.sha} 
                      onClick={() => handleNavigate(item)}
                      className="file-explorer__row file-explorer__row--clickable"
                    >
                      <td className="file-explorer__cell-icon">
                        {item.type === 'dir' ? (
                          <Folder size={18} fill="var(--white-70)" color="var(--white-70)" />
                        ) : (
                          <File size={18} color="var(--white-50)" />
                        )}
                      </td>
                      <td className="file-explorer__cell-name">{item.name}</td>
                      <td className="file-explorer__cell-size">
                        {item.type === 'file' ? `${(item.size / 1024).toFixed(1)} KB` : ''}
                      </td>
                    </tr>
                  ))}
                  {contents.length === 0 && !loading && (
                    <tr>
                      <td colSpan="3" className="file-explorer__empty">No files found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  )
}
