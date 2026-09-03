import { useState } from 'react'
import { Search, ShieldCheck, ShieldAlert, ShieldX, ShieldQuestion } from 'lucide-react'
import { rechercherAttestation, EXEMPLE_IMMATRICULATION } from '../../data/attestations.js'
import { STATUT_STYLES } from '../../utils/constants.js'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

const ICONS_STATUT = { valide: ShieldCheck, expire_bientot: ShieldAlert, expire: ShieldX }

export default function VerificateurAttestation() {
  const [valeur, setValeur] = useState('')
  const [resultat, setResultat] = useState(undefined) // undefined = pas cherché, null = introuvable

  function handleSubmit(e) {
    e.preventDefault()
    if (!valeur.trim()) return
    setResultat(rechercherAttestation(valeur))
  }

  const IconStatut = resultat ? ICONS_STATUT[resultat.statut] : null

  return (
    <section id="verification" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Vérification en ligne"
        title="Votre attestation est-elle à jour ?"
        description="Entrez une immatriculation pour vérifier la validité de l'attestation de visite technique."
        align="center"
      />

      <Card className="mx-auto max-w-xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <input
            value={valeur}
            onChange={(e) => setValeur(e.target.value.toUpperCase())}
            type="text"
            placeholder={`Ex : ${EXEMPLE_IMMATRICULATION}`}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm uppercase focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
          <Button type="submit" icon={Search}>
            Vérifier
          </Button>
        </form>

        {resultat === null && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
            <ShieldQuestion className="h-5 w-5 shrink-0 text-slate-400" />
            Aucune attestation trouvée pour cette immatriculation. Vérifiez la saisie ou contactez le centre.
          </div>
        )}

        {resultat && (
          <div className={`mt-5 rounded-xl border p-4 ${STATUT_STYLES[resultat.statut].bg} ${STATUT_STYLES[resultat.statut].border}`}>
            <div className={`flex items-center gap-2 text-sm font-semibold ${STATUT_STYLES[resultat.statut].text}`}>
              {IconStatut && <IconStatut className="h-5 w-5" />}
              {STATUT_STYLES[resultat.statut].label}
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-200">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Catégorie</dt>
                <dd className="font-medium">{resultat.categorie}</dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Date de visite</dt>
                <dd className="font-medium">{resultat.dateVisite}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-500 dark:text-slate-400">Date d'expiration</dt>
                <dd className="font-medium">{resultat.dateExpiration}</dd>
              </div>
            </dl>
          </div>
        )}
      </Card>
    </section>
  )
}
