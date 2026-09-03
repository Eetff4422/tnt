import { AlertTriangle, BarChart3, Car, CheckCircle2, Target, XCircle } from 'lucide-react'
import { STATS_JOUR } from '../../data/stats.js'
import { DERNIERS_CONTROLES } from '../../data/fileInspection.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Card from '../../components/ui/Card.jsx'
import Badge from '../../components/ui/Badge.jsx'
import CountUp from '../../components/ui/CountUp.jsx'
import EnteteEspace from '../../components/espace/EnteteEspace.jsx'

// Le remplissage porte la sévérité, la piste reprend une teinte claire de la même
// gamme, et chaque état s'accompagne d'une icône et d'un libellé.
function severite(taux) {
  if (taux >= 80) {
    return {
      libelle: 'Conformité satisfaisante',
      icone: CheckCircle2,
      texte: 'text-emerald-700 dark:text-emerald-400',
      remplissage: 'bg-emerald-600',
      piste: 'bg-emerald-100 dark:bg-emerald-500/20',
    }
  }
  if (taux >= 60) {
    return {
      libelle: 'Conformité à surveiller',
      icone: AlertTriangle,
      texte: 'text-amber-700 dark:text-amber-400',
      remplissage: 'bg-amber-500',
      piste: 'bg-amber-100 dark:bg-amber-500/20',
    }
  }
  return {
    libelle: 'Conformité insuffisante',
    icone: XCircle,
    texte: 'text-red-700 dark:text-red-400',
    remplissage: 'bg-red-600',
    piste: 'bg-red-100 dark:bg-red-500/20',
  }
}

const STYLES_RESULTAT = {
  conforme: { label: 'Conforme', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icone: CheckCircle2 },
  avertissement: { label: 'Avertissement', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icone: AlertTriangle },
  non_conforme: { label: 'Non conforme', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icone: XCircle },
}

export default function EspaceMairie() {
  const { utilisateur } = useAuth()
  const { vehiculesControles, objectifJournalier, tauxConformite, repartition } = STATS_JOUR
  const progression = Math.round((vehiculesControles / objectifJournalier) * 100)
  const etat = severite(tauxConformite)
  const IconeEtat = etat.icone

  return (
    <div>
      <EnteteEspace
        titre="Tableau de bord de la conformité"
        sousTitre={`${utilisateur.nom} · transports urbains de la commune, journée en cours`}
      />

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Car className="h-4 w-4" />
              <p className="text-sm font-medium">Véhicules contrôlés aujourd'hui</p>
            </div>
            <p className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white">
              <CountUp valeur={vehiculesControles} />
            </p>
            <div className="mt-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-primary-100 dark:bg-primary-500/20">
                <div
                  className="h-full rounded-full bg-primary-600"
                  style={{ width: `${Math.min(progression, 100)}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Objectif du jour : {objectifJournalier} véhicules ({progression} %)
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className={`flex items-center gap-2 ${etat.texte}`}>
              <IconeEtat className="h-4 w-4" />
              <p className="text-sm font-medium">{etat.libelle}</p>
            </div>
            <p className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white">
              <CountUp valeur={tauxConformite} suffixe=" %" />
            </p>
            <div className="mt-4">
              <div className={`h-2 w-full overflow-hidden rounded-full ${etat.piste}`}>
                <div className={`h-full rounded-full ${etat.remplissage}`} style={{ width: `${tauxConformite}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Taux de conformité des transports urbains
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Target className="h-4 w-4" />
              <p className="text-sm font-medium">Reste à contrôler</p>
            </div>
            <p className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white">
              <CountUp valeur={Math.max(objectifJournalier - vehiculesControles, 0)} />
            </p>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Véhicules restants pour atteindre l'objectif journalier fixé avec la Mairie.
            </p>
          </Card>
        </div>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <BarChart3 className="h-5 w-5 text-primary-600 dark:text-primary-400" /> Répartition par catégorie
          </h2>
          <Card className="space-y-5 p-6">
            {repartition.map((ligne) => {
              const pourcentage = Math.round((ligne.conformes / ligne.controles) * 100)
              return (
                <div key={ligne.categorie}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-800 dark:text-slate-100">{ligne.categorie}</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {ligne.conformes}/{ligne.controles} conformes · {pourcentage} %
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-primary-600" style={{ width: `${pourcentage}%` }} />
                  </div>
                </div>
              )
            })}
          </Card>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Derniers contrôles</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Heure</th>
                    <th className="px-5 py-3 font-semibold">Immatriculation</th>
                    <th className="px-5 py-3 font-semibold">Catégorie</th>
                    <th className="px-5 py-3 font-semibold">Résultat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {DERNIERS_CONTROLES.map((controle) => {
                    const style = STYLES_RESULTAT[controle.resultat]
                    return (
                      <tr key={controle.id}>
                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{controle.heure}</td>
                        <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-100">
                          {controle.immatriculation}
                        </td>
                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{controle.categorie}</td>
                        <td className="px-5 py-3">
                          <Badge
                            className={`${style.bg} ${style.text} ${style.border}`}
                            icon={style.icone}
                          >
                            {style.label}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
