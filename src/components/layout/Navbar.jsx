import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, LogIn, Menu, Phone, Store, X } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Logo from '../ui/Logo.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import MenuUtilisateur from './MenuUtilisateur.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

// Mode vitrine : navigation publique
const LIENS_VITRINE = [
  { to: '/services', label: 'Nos services' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/actualites', label: 'Actualités' },
  { to: '/vision', label: 'Vision produit' },
  { to: '/application-mobile', label: 'Application mobile' },
  { to: '/contact', label: 'Contact' },
]

// Mode application : navigation de l'espace connecté
const LIENS_APP = [
  { to: '/', label: 'Mon espace', icone: LayoutDashboard },
  { to: '/contact', label: 'Contact', icone: Phone },
  { to: '/vitrine', label: 'Retour au site', icone: Store },
]

export default function Navbar() {
  const { estConnecte } = useAuth()
  const [ouvert, setOuvert] = useState(false)

  const liens = estConnecte ? LIENS_APP : LIENS_VITRINE

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary-800 dark:text-white">
          {/* La variante suit le thème : hexagone foncé sur fond clair, éclairci sur fond sombre */}
          <Logo className="h-9 w-9 dark:hidden" ton="marque" />
          <Logo className="hidden h-9 w-9 dark:block" ton="clair" />
          <span className="leading-tight">
            Technital
            <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
              {estConnecte ? 'Espace de gestion' : 'Libreville'}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {liens.map((lien) => (
            <Link
              key={lien.to}
              to={lien.to}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-300"
            >
              {lien.icone && <lien.icone className="h-4 w-4" />}
              {lien.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <ThemeToggle />
          {estConnecte ? (
            <MenuUtilisateur />
          ) : (
            <>
              <a
                href="tel:+24166856046"
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                <Phone className="h-4 w-4" /> 066 85 60 46
              </a>
              <Button as={Link} to="/connexion" variant="primary" icon={LogIn}>
                Connexion
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <ThemeToggle />
          {estConnecte && <MenuUtilisateur />}
          <button
            type="button"
            className="p-1 text-slate-700 dark:text-slate-200"
            onClick={() => setOuvert((o) => !o)}
            aria-label="Menu"
            aria-expanded={ouvert}
          >
            {ouvert ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {ouvert && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 xl:hidden">
          <div className="flex flex-col gap-4">
            {liens.map((lien) => (
              <Link
                key={lien.to}
                to={lien.to}
                onClick={() => setOuvert(false)}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                {lien.icone && <lien.icone className="h-4 w-4" />}
                {lien.label}
              </Link>
            ))}

            {!estConnecte && (
              <>
                <a
                  href="tel:+24166856046"
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  <Phone className="h-4 w-4" /> 066 85 60 46
                </a>
                <Button as={Link} to="/connexion" variant="primary" icon={LogIn} onClick={() => setOuvert(false)}>
                  Connexion
                </Button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
