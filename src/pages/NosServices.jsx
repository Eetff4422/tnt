import { Link } from 'react-router-dom'
import { Car, Bus, Truck, FileText, ShieldCheck, Receipt, FileClock } from 'lucide-react'
import { CATEGORIES, PIECES_REQUISES, formatFCFA } from '../data/tarifs.js'
import { ETAPES_VISITE, POINTS_CONTROLE_PAR_CATEGORIE } from '../data/pointsControle.js'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'

const ICONS = { Car, Bus, Truck, FileText, ShieldCheck, Receipt, FileClock }

const DESCRIPTIONS_CATEGORIE = {
  leger: "Voitures particulières et véhicules légers utilisés au quotidien. Le contrôle vérifie que le véhicule reste sûr pour son conducteur, ses passagers et les autres usagers de la route.",
  taxi: "Taxis, minibus et utilitaires assurent une part importante des déplacements à Libreville. Leur usage intensif justifie une attention renforcée sur le freinage, les essieux et la signalisation.",
  'poids-lourd': "Camions, bus et gros porteurs présentent un risque accru en cas de défaillance technique, du fait de leur masse et de leur fréquence de circulation sur les grands axes.",
}

export default function NosServices() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-900 to-primary-800 py-16 text-white dark:from-slate-950 dark:to-primary-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-200">Nos services</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Un contrôle technique adapté à chaque catégorie de véhicule
          </h1>
          <p className="mt-4 max-w-2xl text-primary-100">
            Les tarifs et points de contrôle appliqués suivent les barèmes officiels du Ministère des Transports.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.icon]
            const points = POINTS_CONTROLE_PAR_CATEGORIE[cat.id]
            return (
              <Card key={cat.id} className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-700 text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{cat.labelLong}</h2>
                      <p className="mt-1 max-w-xl text-sm text-slate-600 dark:text-slate-400">
                        {DESCRIPTIONS_CATEGORIE[cat.id]}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 text-left lg:text-right">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Tarif</p>
                    <p className="text-2xl font-extrabold text-primary-800 dark:text-primary-300">
                      {cat.tarifMin === cat.tarifMax
                        ? formatFCFA(cat.tarifMin)
                        : `${formatFCFA(cat.tarifMin)} – ${formatFCFA(cat.tarifMax)}`}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Points de contrôle</p>
                  <div className="flex flex-wrap gap-2">
                    {points.map((point) => (
                      <span
                        key={point}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900/40 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Déroulement"
            title="Le parcours de la visite technique"
            description="Un parcours identique pour tous les véhicules, en trois étapes."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {ETAPES_VISITE.map((etape) => (
              <Card key={etape.id} className="p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-200">
                  {etape.id}
                </span>
                <p className="mt-3 font-semibold text-slate-900 dark:text-white">{etape.titre}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{etape.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Pièces à fournir" title="Un dossier complet accélère votre passage" align="center" />
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {PIECES_REQUISES.map((piece) => {
            const Icon = ICONS[piece.icon]
            return (
              <Card key={piece.id} className="flex items-start gap-3 p-4">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400" />
                <span className="text-sm text-slate-700 dark:text-slate-300">{piece.label}</span>
              </Card>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Prêt à connaître le tarif exact et à réserver votre créneau ?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button as={Link} to="/#simulateur" variant="secondary">
              Simuler ma visite
            </Button>
            <Button as={Link} to="/#rdv" variant="primary">
              Prendre rendez-vous
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
