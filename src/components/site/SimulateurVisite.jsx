import { useState } from 'react'
import { Car, Bus, Truck, FileText, ShieldCheck, Receipt, FileClock, CheckCircle2 } from 'lucide-react'
import { CATEGORIES, PIECES_REQUISES, formatFCFA, getCategorie } from '../../data/tarifs.js'
import { POINTS_CONTROLE_PAR_CATEGORIE, ETAPES_VISITE } from '../../data/pointsControle.js'
import Card from '../ui/Card.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

const ICONS = { Car, Bus, Truck, FileText, ShieldCheck, Receipt, FileClock }

export default function SimulateurVisite() {
  const [categorieId, setCategorieId] = useState('leger')
  const categorie = getCategorie(categorieId)
  const points = POINTS_CONTROLE_PAR_CATEGORIE[categorieId]

  return (
    <section id="simulateur" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Simulateur de visite"
        title="Combien coûte votre contrôle technique ?"
        description="Choisissez la catégorie de votre véhicule pour connaître le tarif, les pièces à fournir et les points contrôlés."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {CATEGORIES.map((cat) => {
          const Icon = ICONS[cat.icon]
          const active = cat.id === categorieId
          return (
            <button
              key={cat.id}
              onClick={() => setCategorieId(cat.id)}
              type="button"
              className={`flex items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left transition-colors ${
                active
                  ? 'border-primary-700 bg-primary-50 dark:border-primary-400 dark:bg-primary-950'
                  : 'border-slate-200 bg-white hover:border-primary-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-600'
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  active
                    ? 'bg-primary-700 text-white dark:bg-primary-500'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-slate-900 dark:text-white">{cat.label}</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">{cat.description}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tarif estimé</p>
          <p className="mt-1 text-4xl font-extrabold text-primary-800 dark:text-primary-300">
            {categorie.tarifMin === categorie.tarifMax
              ? formatFCFA(categorie.tarifMin)
              : `${formatFCFA(categorie.tarifMin)} – ${formatFCFA(categorie.tarifMax)}`}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Barème officiel du Ministère des Transports. Contre-visite à tarif réduit en cas de non-conformité.
          </p>

          <div className="mt-6 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Parcours de la visite</p>
            {ETAPES_VISITE.map((etape) => (
              <div key={etape.id} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-200">
                  {etape.id}
                </span>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">{etape.titre}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{etape.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <p className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Pièces à fournir</p>
          <ul className="space-y-3">
            {PIECES_REQUISES.map((piece) => {
              const Icon = ICONS[piece.icon]
              return (
                <li key={piece.id} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400" />
                  {piece.label}
                </li>
              )
            })}
          </ul>
        </Card>

        <Card className="p-6">
          <p className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
            Points de contrôle — {categorie.labelLong}
          </p>
          <ul className="space-y-2.5">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                {point}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
