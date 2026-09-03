import { Link } from 'react-router-dom'
import { Bell, Download, LogIn, Smartphone, WifiOff, Wallet } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import MaquetteMobile from '../components/mobile-app/MaquetteMobile.jsx'

const ATOUTS = [
  {
    icone: Bell,
    titre: 'Rappels avant expiration',
    description:
      "Une notification prévient le propriétaire plusieurs semaines avant l'échéance, pour éviter de rouler avec une attestation périmée.",
  },
  {
    icone: Wallet,
    titre: 'Paiement Mobile Money',
    description:
      "Le règlement de la visite se fait depuis le téléphone, via Airtel Money ou Moov Money, sans passer par la caisse.",
  },
  {
    icone: WifiOff,
    titre: 'Saisie terrain sans réseau',
    description:
      "L'agent renseigne sa checklist sur la fosse même en cas de coupure : les données remontent dès que la connexion revient.",
  },
]

const PROFILS_APP = [
  {
    titre: 'Automobiliste',
    contenu: 'Flotte, échéances, historique des visites et paiement de la contre-visite.',
  },
  {
    titre: 'Agent de contrôle',
    contenu: 'File du jour, scan de plaque, checklist des points majeurs et photos d\'anomalies.',
  },
  {
    titre: 'Mairie de Libreville',
    contenu: 'Indicateurs de conformité des transports urbains, consultables en déplacement.',
  },
]

export default function ApplicationMobile() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-900 to-primary-800 py-16 text-white dark:from-slate-950 dark:to-primary-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary-200">
            <Smartphone className="h-4 w-4" /> Application mobile
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            L'application de gestion Technital, dans la poche
          </h1>
          <p className="mt-4 max-w-2xl text-primary-100">
            La version mobile reprend les trois espaces de l'application en ligne, adaptés à un usage sur le terrain et
            en déplacement.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Maquette interactive"
              title="Essayez l'application"
              description="Connectez-vous dans le téléphone ci-contre, puis basculez entre les trois profils. Toutes les données affichées sont simulées."
            />

            <div className="space-y-4">
              {PROFILS_APP.map((profil, index) => (
                <Reveal key={profil.titre} delay={index * 100}>
                  <Card className="p-5">
                    <p className="font-semibold text-slate-900 dark:text-white">{profil.titre}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{profil.contenu}</p>
                  </Card>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                <Smartphone className="h-4 w-4" /> Bientôt sur iOS
              </span>
              <span className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                <Download className="h-4 w-4" /> Bientôt sur Android
              </span>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <MaquetteMobile />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900/40 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Ce que le mobile apporte"
            title="Pensée pour le terrain"
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {ATOUTS.map((atout, index) => (
              <Reveal key={atout.titre} delay={index * 110}>
                <Card className="h-full p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200">
                    <atout.icone className="h-6 w-6" />
                  </span>
                  <p className="mt-4 font-semibold text-slate-900 dark:text-white">{atout.titre}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{atout.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">
              La version web de cette application est déjà accessible : connectez-vous pour découvrir l'espace
              correspondant à votre profil.
            </p>
            <Button as={Link} to="/connexion" variant="primary" icon={LogIn}>
              Accéder à l'application en ligne
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
