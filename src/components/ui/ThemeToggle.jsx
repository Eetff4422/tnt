import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const CLE_STOCKAGE = 'technital-theme'

// Bascule clair/sombre. Le thème initial est déjà appliqué par le script inline
// de index.html : on se contente ici de lire l'état réel du <html>.
export default function ThemeToggle({ className = '' }) {
  const [sombre, setSombre] = useState(false)

  useEffect(() => {
    setSombre(document.documentElement.classList.contains('dark'))
  }, [])

  function basculer() {
    const nouveau = !sombre
    setSombre(nouveau)
    document.documentElement.classList.toggle('dark', nouveau)
    try {
      localStorage.setItem(CLE_STOCKAGE, nouveau ? 'dark' : 'light')
    } catch {
      /* stockage indisponible : la préférence ne sera pas mémorisée */
    }
  }

  return (
    <button
      type="button"
      onClick={basculer}
      aria-label={sombre ? 'Passer en thème clair' : 'Passer en thème sombre'}
      className={`flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 ${className}`}
    >
      {sombre ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
