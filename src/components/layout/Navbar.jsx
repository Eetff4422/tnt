import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Logo from '../ui/Logo.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'

const LINKS = [
  { to: '/services', label: 'Nos services' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/actualites', label: 'Actualités' },
  { to: '/vision', label: 'Vision produit' },
  { to: '/#app-mobile', label: 'Application mobile' },
  { to: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-primary-800 dark:text-white">
          <Logo />
          <span className="leading-tight">
            Technital
            <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">Libreville</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <ThemeToggle />
          <a
            href="tel:+24166856046"
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            <Phone className="h-4 w-4" /> 066 85 60 46
          </a>
          <Button as={Link} to="/#rdv" variant="primary">
            Prendre RDV
          </Button>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="p-1 text-slate-700 dark:text-slate-200"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 xl:hidden">
          <div className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+24166856046"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              <Phone className="h-4 w-4" /> 066 85 60 46
            </a>
            <Button as={Link} to="/#rdv" variant="primary" onClick={() => setOpen(false)}>
              Prendre RDV
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
