import { useState } from 'react'
import { Car, Bus, Truck, Wallet, X, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react'
import { VEHICULES_FLOTTE } from '../../data/vehicules.js'
import { HISTORIQUE_VISITES, RESULTAT_STYLES } from '../../data/historique.js'
import { STATUT_STYLES, CATEGORIE_ICONS } from '../../utils/constants.js'
import { formatFCFA } from '../../data/tarifs.js'
import Badge from '../ui/Badge.jsx'

const ICONS = { Car, Bus, Truck }
const OPERATEURS = [
  { id: 'airtel', label: 'Airtel Money', couleur: 'bg-red-500' },
  { id: 'moov', label: 'Moov Money', couleur: 'bg-orange-500' },
]

export default function ClientFlotteView() {
  const [vue, setVue] = useState('flotte') // flotte | historique
  const [vehiculeActif, setVehiculeActif] = useState(null)
  const [etape, setEtape] = useState('choix') // choix | encours | confirme

  function ouvrirPaiement(vehicule) {
    setVehiculeActif(vehicule)
    setEtape('choix')
  }

  function payer() {
    setEtape('encours')
    setTimeout(() => setEtape('confirme'), 1400)
  }

  function fermer() {
    setVehiculeActif(null)
    setEtape('choix')
  }

  return (
    <div className="space-y-3 pt-2">
      {/* Bascule Mes véhicules / Historique */}
      <div className="flex rounded-xl bg-slate-100 p-1">
        {[
          { id: 'flotte', label: 'Mes véhicules' },
          { id: 'historique', label: 'Historique' },
        ].map((onglet) => (
          <button
            key={onglet.id}
            type="button"
            onClick={() => setVue(onglet.id)}
            className={`flex-1 rounded-lg py-1.5 text-[11px] font-semibold transition-colors ${
              vue === onglet.id ? 'bg-white text-primary-700 shadow-sm' : 'text-slate-500'
            }`}
          >
            {onglet.label}
          </button>
        ))}
      </div>

      {vue === 'flotte' ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Ma Flotte</h3>
            <span className="text-xs text-slate-400">{VEHICULES_FLOTTE.length} véhicules</span>
          </div>

          {VEHICULES_FLOTTE.map((vehicule) => {
            const Icon = ICONS[CATEGORIE_ICONS[vehicule.categorie]]
            const style = STATUT_STYLES[vehicule.statut]
            return (
              <div key={vehicule.id} className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{vehicule.nom}</p>
                      <p className="text-xs text-slate-500">{vehicule.immatriculation}</p>
                    </div>
                  </div>
                  <Badge className={`${style.bg} ${style.text} ${style.border}`} dotClassName={style.dot}>
                    {style.label}
                  </Badge>
                </div>

                <div className="mt-2.5 flex items-center justify-between">
                  <p className="text-[11px] text-slate-400">Expire le {vehicule.dateExpiration}</p>
                  {vehicule.statut !== 'valide' && (
                    <button
                      type="button"
                      onClick={() => ouvrirPaiement(vehicule)}
                      className="flex items-center gap-1 rounded-lg bg-primary-700 px-2.5 py-1.5 text-[11px] font-semibold text-white"
                    >
                      <Wallet className="h-3.5 w-3.5" /> Payer
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Historique des visites</h3>
            <span className="text-xs text-slate-400">{HISTORIQUE_VISITES.length} visites</span>
          </div>

          {HISTORIQUE_VISITES.map((visite) => {
            const style = RESULTAT_STYLES[visite.resultat]
            return (
              <div key={visite.id} className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{visite.vehicule}</p>
                    <p className="text-xs text-slate-500">{visite.immatriculation}</p>
                  </div>
                  <Badge
                    className={`${style.bg} ${style.text} ${style.border}`}
                    icon={visite.resultat === 'conforme' ? CheckCircle2 : AlertTriangle}
                  >
                    {style.label}
                  </Badge>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Visite du {visite.date}</span>
                  <span className="font-semibold text-slate-600">{formatFCFA(visite.montant)}</span>
                </div>
              </div>
            )
          })}
        </>
      )}

      {vehiculeActif && (
        <div className="fixed inset-0 z-30 flex items-end bg-slate-900/40">
          <div className="w-full rounded-t-3xl bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-900">Payer via Mobile Money</p>
              <button type="button" onClick={fermer} aria-label="Fermer">
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>

            {etape === 'choix' && (
              <div className="space-y-2">
                <p className="mb-2 text-xs text-slate-500">
                  {vehiculeActif.nom} — {vehiculeActif.immatriculation}
                </p>
                {OPERATEURS.map((operateur) => (
                  <button
                    key={operateur.id}
                    type="button"
                    onClick={payer}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left text-sm font-medium text-slate-700 hover:border-primary-300"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${operateur.couleur}`}
                    >
                      {operateur.label[0]}
                    </span>
                    {operateur.label}
                  </button>
                ))}
              </div>
            )}

            {etape === 'encours' && (
              <div className="flex flex-col items-center gap-2 py-6 text-slate-600">
                <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
                <p className="text-sm">Paiement en cours…</p>
              </div>
            )}

            {etape === 'confirme' && (
              <div className="flex flex-col items-center gap-2 py-6">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                <p className="text-sm font-semibold text-slate-900">Paiement confirmé</p>
                <button type="button" onClick={fermer} className="mt-2 text-xs font-medium text-primary-700">
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
