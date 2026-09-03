import { Link } from 'react-router-dom'
import { Compass, Home } from 'lucide-react'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200">
        <Compass className="h-8 w-8" />
      </span>
      <p className="mt-6 text-5xl font-extrabold text-primary-800 dark:text-primary-300">404</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Cette page est introuvable</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        Le lien est peut-être obsolète. Revenez à l'accueil pour prendre rendez-vous ou vérifier une attestation.
      </p>
      <Button as={Link} to="/" variant="primary" icon={Home} className="mt-8">
        Retour à l'accueil
      </Button>
    </section>
  )
}
