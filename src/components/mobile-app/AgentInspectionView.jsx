import { useState } from 'react'
import { ScanLine, CheckCircle2, AlertTriangle, XCircle, Camera, X, ClipboardCheck } from 'lucide-react'
import { CONTROLE_STYLES } from '../../utils/constants.js'

const POINTS_MAJEURS = ['Freinage', 'Suspension', 'Pneumatiques', 'Châssis']
const OPTIONS = ['conforme', 'avertissement', 'non_conforme']
const ICONS = { conforme: CheckCircle2, avertissement: AlertTriangle, non_conforme: XCircle }
const RESULT_BG = { conforme: 'bg-emerald-600', avertissement: 'bg-amber-500', non_conforme: 'bg-red-600' }

export default function AgentInspectionView() {
  const [plaque, setPlaque] = useState('')
  const [scanne, setScanne] = useState(false)
  const [resultats, setResultats] = useState({})
  const [photos, setPhotos] = useState({})
  const [valide, setValide] = useState(false)

  function scanner() {
    setPlaque('LBV 4521 GA')
    setScanne(true)
  }

  function choisir(point, valeur) {
    setResultats((r) => ({ ...r, [point]: valeur }))
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

  return (
    <div className="space-y-4 pt-2">
      <h3 className="text-sm font-bold text-slate-900">Inspection — Fosse &amp; Bancs</h3>

      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
        <p className="mb-2 text-xs font-medium text-slate-500">Plaque d'immatriculation</p>
        <div className="flex gap-2">
          <input
            value={plaque}
            onChange={(e) => setPlaque(e.target.value.toUpperCase())}
            placeholder="LBV 0000 GA"
            className="flex-1 rounded-lg border border-slate-300 px-2.5 py-2 text-sm uppercase focus:border-primary-500 focus:outline-none"
          />
          <button
            onClick={scanner}
            className="flex items-center gap-1.5 rounded-lg bg-primary-700 px-3 py-2 text-xs font-semibold text-white"
          >
            <ScanLine className="h-4 w-4" /> Scan
          </button>
        </div>
        {scanne && <p className="mt-2 text-[11px] text-emerald-600">Véhicule identifié : Taxi Toyota Corolla</p>}
      </div>

      <div className="space-y-3">
        {POINTS_MAJEURS.map((point) => (
          <div key={point} className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">{point}</p>
              <label className="flex cursor-pointer items-center gap-1 text-[11px] font-medium text-primary-700">
                <Camera className="h-3.5 w-3.5" />
                Photo
                <input type="file" accept="image/*" className="hidden" onChange={(e) => ajouterPhoto(point, e)} />
              </label>
            </div>

            {photos[point] && (
              <div className="relative mt-2 inline-block">
                <img src={photos[point]} alt={`Anomalie ${point}`} className="h-16 w-16 rounded-lg object-cover" />
                <button
                  onClick={() => retirerPhoto(point)}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            <div className="mt-2.5 grid grid-cols-3 gap-1.5">
              {OPTIONS.map((option) => {
                const Icon = ICONS[option]
                const isActive = resultats[point] === option
                return (
                  <button
                    key={option}
                    onClick={() => choisir(point, option)}
                    className={`flex flex-col items-center gap-1 rounded-lg border px-1.5 py-2 text-[10px] font-medium transition-colors ${
                      isActive ? CONTROLE_STYLES[option].active : 'border-slate-200 text-slate-500'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {CONTROLE_STYLES[option].label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>
            {nbEvalues}/{POINTS_MAJEURS.length} points évalués
          </span>
          <span>
            {nbNonConformes} non conforme(s) · {nbAvertissements} avertissement(s)
          </span>
        </div>

        {!valide ? (
          <button
            disabled={!tousEvalues}
            onClick={() => setValide(true)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 py-2.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            <ClipboardCheck className="h-4 w-4" /> Valider l'inspection
          </button>
        ) : (
          <div
            className={`mt-3 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold text-white ${RESULT_BG[statutGlobal]}`}
          >
            Résultat : {CONTROLE_STYLES[statutGlobal].label}
          </div>
        )}
      </div>
    </div>
  )
}
