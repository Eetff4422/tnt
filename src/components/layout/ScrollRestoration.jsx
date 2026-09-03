import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router ne gère pas nativement le scroll lors d'une navigation côté client :
// on remonte en haut à chaque changement de page, ou on scrolle vers l'ancre (#id) si présente.
export default function ScrollRestoration() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}
