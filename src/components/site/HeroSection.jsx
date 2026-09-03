import { Link } from 'react-router-dom'
import { CalendarCheck, Gauge, ShieldCheck } from 'lucide-react'
import Button from '../ui/Button.jsx'
import AffluenceIndicator from './AffluenceIndicator.jsx'
import HeroIllustration from './HeroIllustration.jsx'

export default function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700 text-white dark:from-slate-950 dark:via-primary-950 dark:to-primary-900"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <div className="flex items-center gap-2 text-primary-200">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              En convention avec la Mairie de Libreville
            </span>
          </div>

          <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Le contrôle technique automobile, sans la file d'attente.
          </h1>

          <p className="mt-5 max-w-xl text-lg text-primary-100">
            Simulez votre visite, réservez votre créneau et vérifiez votre attestation en ligne — pour une sécurité
            routière renforcée à Libreville.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button as={Link} to="/#rdv" variant="light" icon={CalendarCheck}>
              Prendre rendez-vous
            </Button>
            <Button as={Link} to="/#simulateur" variant="outline" icon={Gauge}>
              Simuler ma visite
            </Button>
          </div>

          <div className="mt-10">
            <AffluenceIndicator />
          </div>
        </div>

        <div className="hidden justify-center lg:flex">
          <HeroIllustration className="w-full max-w-lg" />
        </div>
      </div>
    </section>
  )
}
