import { useState } from 'react'
import { Send, CheckCircle2, Mail } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Button from '../ui/Button.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

const SUJETS = [
  'Question sur une visite technique',
  'Suivi d\'un rendez-vous',
  'Contre-visite après réparation',
  'Flotte d\'entreprise',
  'Autre demande',
]

const FORMULAIRE_VIDE = { nom: '', email: '', sujet: SUJETS[0], message: '' }

export default function ContactForm() {
  const [formulaire, setFormulaire] = useState(FORMULAIRE_VIDE)
  const [envoye, setEnvoye] = useState(false)
  const [erreur, setErreur] = useState('')

  function modifier(champ, valeur) {
    setFormulaire((f) => ({ ...f, [champ]: valeur }))
  }

  // Démonstration : aucun envoi réseau, la confirmation est simulée côté client.
  function soumettre(e) {
    e.preventDefault()
    if (!formulaire.nom || !formulaire.email || !formulaire.message) {
      setErreur('Merci de renseigner votre nom, votre e-mail et votre message.')
      return
    }
    setErreur('')
    setEnvoye(true)
  }

  return (
    <section id="contact-form" className="bg-slate-50 py-20 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Nous écrire"
          title="Une question ? Écrivez-nous"
          description="Notre équipe répond aux demandes sous 24 à 48 heures ouvrées."
          align="center"
        />

        <Card className="mx-auto max-w-2xl p-6 sm:p-8">
          {envoye ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <p className="text-lg font-bold text-slate-900 dark:text-white">Message envoyé</p>
              <p className="max-w-sm text-sm text-slate-600 dark:text-slate-400">
                Merci {formulaire.nom}. Nous revenons vers vous à l'adresse {formulaire.email} dans les meilleurs
                délais.
              </p>
              <Button
                variant="secondary"
                className="mt-2"
                onClick={() => {
                  setEnvoye(false)
                  setFormulaire(FORMULAIRE_VIDE)
                }}
              >
                Envoyer un autre message
              </Button>
            </div>
          ) : (
            <form onSubmit={soumettre} className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                Nom complet
                <input
                  value={formulaire.nom}
                  onChange={(e) => modifier('nom', e.target.value)}
                  type="text"
                  placeholder="Jean Ndong"
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                Adresse e-mail
                <input
                  value={formulaire.email}
                  onChange={(e) => modifier('email', e.target.value)}
                  type="email"
                  placeholder="vous@exemple.ga"
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-2">
                Sujet
                <select
                  value={formulaire.sujet}
                  onChange={(e) => modifier('sujet', e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  {SUJETS.map((sujet) => (
                    <option key={sujet}>{sujet}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-2">
                Message
                <textarea
                  value={formulaire.message}
                  onChange={(e) => modifier('message', e.target.value)}
                  rows={5}
                  placeholder="Décrivez votre demande…"
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </label>

              {erreur && <p className="text-sm font-medium text-red-600 sm:col-span-2">{erreur}</p>}

              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <Button type="submit" icon={Send}>
                  Envoyer le message
                </Button>
                <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Mail className="h-3.5 w-3.5" /> Ou appelez-nous au 066 85 60 46
                </span>
              </div>
            </form>
          )}
        </Card>
      </div>
    </section>
  )
}
