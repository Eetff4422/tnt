import { useState } from 'react'
import { AlertTriangle, Camera, CheckCircle2, ClipboardCheck, ScanLine, X, XCircle } from 'lucide-react'
import { FILE_INSPECTION, ETATS_FILE } from '../../data/fileInspection.js'
import { CONTROLE_STYLES } from '../../utils/constants.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Card from '../../components/ui/Card.jsx'
import Badge from '../../components/ui/Badge.jsx'
import EnteteEspace from '../../components/espace/EnteteEspace.jsx'

const POINTS_MAJEURS = ['Freinage', 'Suspension', 'Pneumatiques', 'Châssis']
const OPTIONS = ['conforme', 'avertissement', 'non_conforme']
const ICONES_OPTION = { conforme: CheckCircle2, avertissement: AlertTriangle, non_conforme: XCircle }
const FOND_RESULTAT = {
  conforme: 'bg-emerald-600',
  avertissement: 'bg-amber-500',
  non_conforme: 'bg-red-600',
}

export default function EspaceAgent() {
  const { utilisateur } = useAuth()

  // Le véhicule en cours de traitement dans la file
  const [vehiculeActif, setVehiculeActif] = useState(
    FILE_INSPECTION.find((v) => v.etat === 'en_cours') ?? FILE_INSPECTION[0],
  )
  const [resultats, setResultats] = useState({})
  const [photos, setPhotos] = useState({})
  const [valide, setValide] = useState(false)

  function selectionner(vehicule) {
    setVehiculeActif(vehicule)
    setResultats({})
    setPhotos({})
    setValide(false)
  }

  function ajouterPhoto(point, e) {
    const fichier = e.target.files?.[0]
    if (!fichier) return
    setPhotos((p) => ({ ...p, [point]: URL.createObjectURL(fichier) }))
  }

  function retirerPhoto(point) {
    setPhotos((p) => {
      const copie = { ...p }
      delete copie[point]
      return copie
    })
  }

  const nbEvalues = Object.keys(resultats).length
  const nbNonConformes = Object.values(resultats).filter((v) => v === 'non_conforme').length
  const nbAvertissements = Object.values(resultats).filter((v) => v === 'avertissement').length
  const tousEvalues = nbEvalues === POINTS_MAJEURS.length
  const statutGlobal = nbNonConformes > 0 ? 'non_conforme' : nbAvertissements > 0 ? 'avertissement' : 'conforme'

  const restants = FILE_INSPECTION.filter((v) => v.etat !== 'termine').length

  return (
    <div>
      <EnteteEspace
        titre="Poste d'inspection"
        sousTitre={`${utilisateur.fonction} · ${restants} véhicules restants dans la file du jour`}
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[340px_1fr] lg:px-8">
        {/* File du jour */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">File du jour</h2>
          <div className="space-y-3">
            {FILE_INSPECTION.map((vehicule) => {
              const etat = ETATS_FILE[vehicule.etat]
              const actif = vehiculeActif?.id === vehicule.id
              return (
                <button
                  key={vehicule.id}
                  type="button"
                  onClick={() => selectionner(vehicule)}
                  className={`w-full rounded-2xl border-2 p-4 text-left transition-colors ${
                    actif
                      ? 'border-primary-700 bg-primary-50 dark:border-primary-400 dark:bg-primary-950'
                      : 'border-slate-200 bg-white hover:border-primary-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{vehicule.creneau}</span>
                    <Badge className={`${etat.bg} ${etat.text} ${etat.border}`}>{etat.label}</Badge>
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-slate-800 dark:text-slate-100">
                    {vehicule.immatriculation}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {vehicule.vehicule} · {vehicule.proprietaire}
                  </p>
                </button>
              )
            })}
          </div>
        </section>

        {/* Fiche d'inspection */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Fiche d'inspection</h2>

          <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Véhicule en cours
                </p>
                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {vehiculeActif.immatriculation}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {vehiculeActif.vehicule} · créneau de {vehiculeActif.creneau}
                </p>
              </div>
              <span className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <ScanLine className="h-4 w-4" /> Plaque lue au scan
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {POINTS_MAJEURS.map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{point}</p>
                    <label className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-primary-700 dark:text-primary-300">
                      <Camera className="h-4 w-4" />
                      Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => ajouterPhoto(point, e)}
                      />
                    </label>
                  </div>

                  {photos[point] && (
                    <div className="relative mt-3 inline-block">
                      <img
                        src={photos[point]}
                        alt={`Anomalie ${point}`}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => retirerPhoto(point)}
                        aria-label={`Retirer la photo ${point}`}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {OPTIONS.map((option) => {
                      const Icone = ICONES_OPTION[option]
                      const actif = resultats[point] === option
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setResultats((r) => ({ ...r, [point]: option }))}
                          className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-[11px] font-medium transition-colors ${
                            actif
                              ? CONTROLE_STYLES[option].active
                              : 'border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400'
                          }`}
                        >
                          <Icone className="h-4 w-4" />
                          {CONTROLE_STYLES[option].label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5 dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {nbEvalues}/{POINTS_MAJEURS.length} points évalués · {nbNonConformes} non conforme(s) ·{' '}
                {nbAvertissements} avertissement(s)
              </p>

              {valide ? (
                <span
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${FOND_RESULTAT[statutGlobal]}`}
                >
                  Résultat : {CONTROLE_STYLES[statutGlobal].label}
                </span>
              ) : (
                <button
                  type="button"
                  disabled={!tousEvalues}
                  onClick={() => setValide(true)}
                  className="flex items-center gap-2 rounded-xl bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 dark:bg-primary-600 dark:hover:bg-primary-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
                >
                  <ClipboardCheck className="h-4 w-4" /> Valider l'inspection
                </button>
              )}
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
