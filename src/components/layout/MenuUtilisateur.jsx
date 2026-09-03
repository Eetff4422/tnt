import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Car, ChevronDown, ClipboardCheck, Landmark, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

const ICONES = { Car, ClipboardCheck, Landmark }

export default function MenuUtilisateur() {
  const { utilisateur, deconnecter } = useAuth()
  const navigate = useNavigate()
  const [ouvert, setOuvert] = useState(false)
  const conteneur = useRef(null)

  // Fermeture au clic à l'extérieur et à la touche Échap
  useEffect(() => {
    function auClic(e) {
      if (conteneur.current && !conteneur.current.contains(e.target)) setOuvert(false)
    }
    function auClavier(e) {
      if (e.key === 'Escape') setOuvert(false)
    }
    document.addEventListener('mousedown', auClic)
    document.addEventListener('keydown', auClavier)
    return () => {
      document.removeEventListener('mousedown', auClic)
      document.removeEventListener('keydown', auClavier)
    }
  }, [])

  if (!utilisateur) return null

  const Icone = ICONES[utilisateur.icone]

  return (
    <div className="relative" ref={conteneur}>
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-expanded={ouvert}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-xl border border-slate-200 py-1.5 pl-1.5 pr-2.5 transition-colors hover:border-primary-300 dark:border-slate-700 dark:hover:border-primary-600"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-700 text-white dark:bg-primary-600">
          <Icone className="h-4 w-4" />
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-xs font-semibold text-slate-900 dark:text-white">{utilisateur.nom}</span>
          <span className="block text-[11px] text-slate-500 dark:text-slate-400">{utilisateur.role}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${ouvert ? 'rotate-180' : ''}`} />
      </button>

      {ouvert && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="border-b border-slate-100 px-3 pb-3 pt-2 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{utilisateur.nom}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{utilisateur.fonction}</p>
          </div>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOuvert(false)
              deconnecter()
              navigate('/', { replace: true })
            }}
            className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4" /> Se déconnecter
          </button>
        </div>
      )}
    </div>
  )
}
