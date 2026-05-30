import { createContext, useContext, useState, useEffect } from 'react'
import en from '../locales/en'
import id from '../locales/id'

const translations = { en, id }

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('cs-lang') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('cs-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => setLang(l => l === 'en' ? 'id' : 'en')

  // Simple nested key resolver, e.g. "hero.title1"
  const t = (path) => {
    return path.split('.').reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : path, translations[lang])
  }

  // Allow passing an array path for mapped items
  const tArray = (path) => {
     const arr = path.split('.').reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : [], translations[lang])
     return Array.isArray(arr) ? arr : []
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, t, tArray }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
