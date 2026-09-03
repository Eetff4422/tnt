import { Car, ShieldCheck, TrendingUp } from 'lucide-react'
import { STATS_JOUR } from '../../data/stats.js'

// Statut de conformité -> couleurs (fill = sévérité, track = pas plus clair de la même teinte)
function statutTaux(taux) {
  if (taux >= 80) return { fill: 'bg-emerald-600', track: 'bg-emerald-100', text: 'text-emerald-700', label: 'Conformité satisfaisante' }
  if (taux >= 60) return { fill: 'bg-amber-500', track: 'bg-amber-100', text: 'text-amber-700', label: 'Conformité à surveiller' }
  return { fill: 'bg-red-600', track: 'bg-red-100', text: 'text-red-700', label: 'Conformité insuffisante' }
}

export default function MairieStatsView() {
  const { vehiculesControles, objectifJournalier, tauxConformite, repartition } = STATS_JOUR
  const progression = Math.round((vehiculesControles / objectifJournalier) * 100)
  const statut = statutTaux(tauxConformite)

  return (
    <div className="space-y-4 pt-2">
      <div>
        <h3 className="text-sm font-bold text-slate-900">Tableau de bord — Mairie</h3>
        <p className="text-[11px] text-slate-400">Transports urbains · aujourd'hui</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-slate-500">
          <Car className="h-4 w-4" />
          <p className="text-xs font-medium">Véhicules contrôlés aujourd'hui</p>
        </div>
        <p className="mt-1 text-3xl font-semibold text-slate-900">{vehiculesControles}</p>
        <div className="mt-2.5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-100">
            <div className="h-full rounded-full bg-primary-600" style={{ width: `${Math.min(progression, 100)}%` }} />
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">
            Objectif du jour : {objectifJournalier} véhicules ({progression}%)
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className={`flex items-center gap-2 ${statut.text}`}>
          <ShieldCheck className="h-4 w-4" />
          <p className="text-xs font-medium">{statut.label}</p>
        </div>
        <p className="mt-1 text-3xl font-semibold text-slate-900">{tauxConformite}%</p>
        <p className="text-[11px] text-slate-400">Taux de conformité des transports urbains</p>
        <div className={`mt-2.5 h-1.5 w-full overflow-hidden rounded-full ${statut.track}`}>
          <div className={`h-full rounded-full ${statut.fill}`} style={{ width: `${tauxConformite}%` }} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-700">
          <TrendingUp className="h-4 w-4 text-primary-600" /> Répartition par catégorie
        </p>
        <div className="space-y-3">
          {repartition.map((r) => {
            const pct = Math.round((r.conformes / r.controles) * 100)
            return (
              <div key={r.categorie}>
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-medium text-slate-700">{r.categorie}</span>
                  <span>
                    {r.conformes}/{r.controles} conformes
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-primary-600" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
