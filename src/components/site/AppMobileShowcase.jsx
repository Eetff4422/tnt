import { Link } from 'react-router-dom'
import { ArrowRight, Download, Smartphone } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import MaquetteMobile from '../mobile-app/MaquetteMobile.jsx'

const PITCH = [
  {
    titre: 'Automobilistes',
    description: 'Suivez la validité de vos véhicules, consultez votre historique et payez en Mobile Money.',
  },
  {
    titre: 'Agents de contrôle',
    description: 'Checklist tactile sur fosse et bancs de test, anomalies photographiées et rapport instantané.',
  },
  {
    titre: 'Mairie de Libreville',
    description: 'Statistiques en direct sur la conformité des transports urbains de la commune.',
  },
]

export default function AppMobileShowcase() {
  return (
    <section
      id="app-mobile"
      className="bg-gradient-to-b from-white to-slate-100 py-20 dark:from-slate-950 dark:to-slate-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Application mobile"
          title="Technital dans la poche de chacun"
          description="La même application de gestion, déclinée sur mobile. Connectez-vous à la maquette pour découvrir les trois profils."
          align="center"
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 space-y-5 lg:order-1">
            {PITCH.map((item, index) => (
              <Reveal key={item.titre} delay={index * 110}>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="font-semibold text-slate-900 dark:text-white">{item.titre}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              </Reveal>
            ))}

            {/* Disponibilité à venir — boutons génériques, sans reprise des badges officiels des stores */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                <Smartphone className="h-4 w-4" /> Bientôt sur iOS
              </span>
              <span className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                <Download className="h-4 w-4" /> Bientôt sur Android
              </span>
            </div>

            <Button as={Link} to="/application-mobile" variant="secondary" icon={ArrowRight}>
              En savoir plus sur l'application
            </Button>
          </div>

          <div className="order-1 lg:order-2">
            <MaquetteMobile />
          </div>
        </div>
      </div>
    </section>
  )
}
