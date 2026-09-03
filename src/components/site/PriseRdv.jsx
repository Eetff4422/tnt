import { useMemo, useState } from 'react'
import { CalendarCheck, CheckCircle2, Clock, Printer } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { CATEGORIES } from '../../data/tarifs.js'
import { CRENEAUX } from '../../data/creneaux.js'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

function toMinutes(heure) {
  const [hh, mm] = heure.split('h').map(Number)
  return hh * 60 + mm
}

// 0 = dimanche, 6 = samedi
function getJourSemaine(dateStr) {
  if (!dateStr) return null
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).getDay()
}

const FORM_INITIAL = { nom: '', telephone: '', immatriculation: '', categorie: 'leger', date: '', creneau: '' }

export default function PriseRdv() {
  const [form, setForm] = useState(FORM_INITIAL)
  const [confirmation, setConfirmation] = useState(null)
  const [erreur, setErreur] = useState('')

  const jour = getJourSemaine(form.date)
  const estDimanche = jour === 0
  const estSamedi = jour === 6

  const creneauxDisponibles = useMemo(() => {
    if (!form.date || estDimanche) return []
    if (estSamedi) return CRENEAUX.filter((c) => toMinutes(c.heure) <= toMinutes('12h00'))
    return CRENEAUX
  }, [form.date, estSamedi, estDimanche])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value, ...(field === 'date' ? { creneau: '' } : {}) }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.nom || !form.telephone || !form.immatriculation || !form.date || !form.creneau) {
      setErreur('Merci de renseigner tous les champs pour finaliser votre pré-enregistrement.')
      return
    }
    setErreur('')
    const reference = `RDV-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
    setConfirmation({ ...form, reference })
  }

  if (confirmation) {
    const categorie = CATEGORIES.find((c) => c.id === confirmation.categorie)
    return (
      <section id="rdv" className="bg-slate-100 py-20 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="zone-impression mx-auto max-w-xl p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Pré-enregistrement confirmé</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Présentez-vous avec vos pièces justificatives. Référence à conserver :
            </p>
            <p className="mt-2 text-xl font-bold tracking-wide text-primary-700 dark:text-primary-300">
              {confirmation.reference}
            </p>

            {/* QR code à présenter au guichet : encode la référence et le véhicule */}
            <div className="mt-5 flex justify-center">
              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700">
                <QRCodeSVG
                  value={`TECHNITAL|${confirmation.reference}|${confirmation.immatriculation}|${confirmation.date} ${confirmation.creneau}`}
                  size={132}
                  level="M"
                />
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-left text-sm dark:bg-slate-800/60">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Véhicule</dt>
                <dd className="font-medium text-slate-800 dark:text-slate-100">
                  {categorie?.label} — {confirmation.immatriculation}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Créneau</dt>
                <dd className="font-medium text-slate-800 dark:text-slate-100">
                  {confirmation.date} à {confirmation.creneau}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Nom</dt>
                <dd className="font-medium text-slate-800 dark:text-slate-100">{confirmation.nom}</dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Téléphone</dt>
                <dd className="font-medium text-slate-800 dark:text-slate-100">{confirmation.telephone}</dd>
              </div>
            </dl>

            <div className="sans-impression mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="primary" icon={Printer} onClick={() => window.print()}>
                Imprimer la confirmation
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setConfirmation(null)
                  setForm(FORM_INITIAL)
                }}
              >
                Prendre un autre rendez-vous
              </Button>
            </div>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="rdv" className="bg-slate-100 py-20 dark:bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Prise de rendez-vous"
          title="Réservez votre créneau et évitez la file d'attente"
          description="Pré-enregistrez votre véhicule en 2 minutes. Présentez-vous simplement à l'heure choisie."
        />

        <Card className="mx-auto max-w-3xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
              Nom complet
              <input
                value={form.nom}
                onChange={(e) => update('nom', e.target.value)}
                type="text"
                placeholder="Jean Ndong"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
              Téléphone
              <input
                value={form.telephone}
                onChange={(e) => update('telephone', e.target.value)}
                type="tel"
                placeholder="066 00 00 00"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
              Immatriculation
              <input
                value={form.immatriculation}
                onChange={(e) => update('immatriculation', e.target.value.toUpperCase())}
                type="text"
                placeholder="LBV 1234 GA"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm uppercase focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
              Catégorie
              <select
                value={form.categorie}
                onChange={(e) => update('categorie', e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
              Date souhaitée
              <input
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                type="date"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
              Créneau
              <select
                value={form.creneau}
                onChange={(e) => update('creneau', e.target.value)}
                disabled={!form.date || estDimanche}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
              >
                <option value="">{estDimanche ? 'Fermé le dimanche' : 'Choisir un créneau'}</option>
                {creneauxDisponibles.map((c) => (
                  <option key={c.heure} value={c.heure} disabled={c.complet}>
                    {c.heure}
                    {c.complet ? ' — complet' : ''}
                  </option>
                ))}
              </select>
            </label>

            {estSamedi && (
              <p className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 sm:col-span-2">
                <Clock className="h-3.5 w-3.5" /> Samedi : créneaux disponibles jusqu'à 12h00 uniquement.
              </p>
            )}
            {erreur && <p className="text-sm font-medium text-red-600 sm:col-span-2">{erreur}</p>}

            <div className="sm:col-span-2">
              <Button type="submit" icon={CalendarCheck} className="w-full sm:w-auto">
                Confirmer le pré-enregistrement
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  )
}
