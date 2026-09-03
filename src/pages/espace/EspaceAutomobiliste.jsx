import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  Bus,
  CalendarCheck,
  Car,
  CheckCircle2,
  Loader2,
  Truck,
  Wallet,
  X,
} from 'lucide-react'
import { VEHICULES_FLOTTE } from '../../data/vehicules.js'
import { HISTORIQUE_VISITES, RESULTAT_STYLES } from '../../data/historique.js'
import { STATUT_STYLES, CATEGORIE_ICONS } from '../../utils/constants.js'
import { formatFCFA } from '../../data/tarifs.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Card from '../../components/ui/Card.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import EnteteEspace from '../../components/espace/EnteteEspace.jsx'

const ICONES = { Car, Bus, Truck }
const OPERATEURS = [
  { id: 'airtel', label: 'Airtel Money', couleur: 'bg-red-500' },
  { id: 'moov', label: 'Moov Money', couleur: 'bg-orange-500' },
]

export default function EspaceAutomobiliste() {
  const { utilisateur } = useAuth()
  const [vehiculeActif, setVehiculeActif] = useState(null)
  const [etapePaiement, setEtapePaiement] = useState('choix')

  const aRenouveler = VEHICULES_FLOTTE.filter((v) => v.statut !== 'valide')

  function payer() {
    setEtapePaiement('encours')
    setTimeout(() => setEtapePaiement('confirme'), 1400)
  }

  function fermer() {
    setVehiculeActif(null)
    setEtapePaiement('choix')
  }

  return (
    <div>
      <EnteteEspace
        titre={`Bonjour ${utilisateur.nom.split(' ')[0]}`}
        sousTitre={`${VEHICULES_FLOTTE.length} véhicules suivis · ${aRenouveler.length} à renouveler`}
      >
        <Button as={Link} to="/contact#rdv" variant="primary" icon={CalendarCheck}>
          Prendre rendez-vous
        </Button>
      </EnteteEspace>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        {aRenouveler.length > 0 && (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>
              {aRenouveler.length === 1 ? 'Un véhicule nécessite' : `${aRenouveler.length} véhicules nécessitent`} une
              action : {aRenouveler.map((v) => v.immatriculation).join(', ')}.
            </span>
          </div>
        )}

        <section>
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Ma flotte</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {VEHICULES_FLOTTE.map((vehicule) => {
              const Icone = ICONES[CATEGORIE_ICONS[vehicule.categorie]]
              const style = STATUT_STYLES[vehicule.statut]
              return (
                <Card key={vehicule.id} className="flex flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <Icone className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{vehicule.nom}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{vehicule.immatriculation}</p>
                      </div>
                    </div>
                    <Badge className={`${style.bg} ${style.text} ${style.border}`} dotClassName={style.dot}>
                      {style.label}
                    </Badge>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Expire le <span className="font-medium text-slate-700 dark:text-slate-200">{vehicule.dateExpiration}</span>
                    </p>
                    {vehicule.statut !== 'valide' && (
                      <button
                        type="button"
                        onClick={() => {
                          setVehiculeActif(vehicule)
                          setEtapePaiement('choix')
                        }}
                        className="flex items-center gap-1.5 rounded-lg bg-primary-700 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-500"
                      >
                        <Wallet className="h-3.5 w-3.5" /> Payer la visite
                      </button>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Historique des visites</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Véhicule</th>
                    <th className="px-5 py-3 font-semibold">Immatriculation</th>
                    <th className="px-5 py-3 font-semibold">Date</th>
                    <th className="px-5 py-3 font-semibold">Résultat</th>
                    <th className="px-5 py-3 text-right font-semibold">Montant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {HISTORIQUE_VISITES.map((visite) => {
                    const style = RESULTAT_STYLES[visite.resultat]
                    return (
                      <tr key={visite.id}>
                        <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-100">{visite.vehicule}</td>
                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{visite.immatriculation}</td>
                        <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{visite.date}</td>
                        <td className="px-5 py-3">
                          <Badge
                            className={`${style.bg} ${style.text} ${style.border}`}
                            icon={visite.resultat === 'conforme' ? CheckCircle2 : AlertTriangle}
                          >
                            {style.label}
                          </Badge>
                        </td>
                        <td className="px-5 py-3 text-right font-medium text-slate-700 dark:text-slate-200">
                          {formatFCFA(visite.montant)}
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

      {vehiculeActif && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <Card className="w-full max-w-md p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Payer via Mobile Money</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {vehiculeActif.nom} — {vehiculeActif.immatriculation}
                </p>
              </div>
              <button type="button" onClick={fermer} aria-label="Fermer">
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            {etapePaiement === 'choix' && (
              <div className="space-y-2">
                {OPERATEURS.map((operateur) => (
                  <button
                    key={operateur.id}
                    type="button"
                    onClick={payer}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3.5 text-left text-sm font-medium text-slate-700 transition-colors hover:border-primary-300 dark:border-slate-700 dark:text-slate-200 dark:hover:border-primary-600"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${operateur.couleur}`}
                    >
                      {operateur.label[0]}
                    </span>
                    {operateur.label}
                  </button>
                ))}
              </div>
            )}

            {etapePaiement === 'encours' && (
              <div className="flex flex-col items-center gap-3 py-8 text-slate-600 dark:text-slate-300">
                <Loader2 className="h-7 w-7 animate-spin text-primary-600" />
                <p className="text-sm">Paiement en cours…</p>
              </div>
            )}

            {etapePaiement === 'confirme' && (
              <div className="flex flex-col items-center gap-3 py-8">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                <p className="font-semibold text-slate-900 dark:text-white">Paiement confirmé</p>
                <Button variant="secondary" onClick={fermer}>
                  Fermer
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
