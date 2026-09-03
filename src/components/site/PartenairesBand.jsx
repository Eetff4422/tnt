import { Building2, Landmark, ShieldCheck, ScrollText } from 'lucide-react'

// Cadres institutionnels dans lesquels s'inscrit l'activité de Technital.
// Mentions textuelles volontaires : pas de reproduction d'emblèmes officiels.
const REFERENCES = [
  { icon: Landmark, titre: 'Mairie de Libreville', sousTitre: 'Convention de partenariat' },
  { icon: ScrollText, titre: 'Ministère des Transports', sousTitre: 'Barèmes tarifaires officiels' },
  { icon: ShieldCheck, titre: 'Centre agréé', sousTitre: 'Contrôle technique automobile' },
  { icon: Building2, titre: 'Trois Quartiers', sousTitre: 'Libreville, Gabon' },
]

export default function PartenairesBand() {
  return (
    <section className="border-b border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Un cadre institutionnel reconnu
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REFERENCES.map((ref) => (
            <div key={ref.titre} className="flex items-center justify-center gap-3 text-center sm:justify-start sm:text-left">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-primary-700 dark:bg-slate-800 dark:text-primary-300">
                <ref.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{ref.titre}</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">{ref.sousTitre}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
