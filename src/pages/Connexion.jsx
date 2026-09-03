import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Car, ClipboardCheck, Info, Landmark, Loader2, Lock, User } from 'lucide-react'
import { PROFILS } from '../data/profils.js'
import { useAuth } from '../context/AuthContext.jsx'
import Card from '../components/ui/Card.jsx'
import Logo from '../components/ui/Logo.jsx'

const ICONES = { Car, ClipboardCheck, Landmark }

export default function Connexion() {
  const { connecter, estConnecte } = useAuth()
  const navigate = useNavigate()

  const [profilChoisi, setProfilChoisi] = useState(null)
  const [enCours, setEnCours] = useState(false)
  const [erreur, setErreur] = useState('')

  // Déjà connecté : on renvoie directement vers l'espace
  if (estConnecte) return <Navigate to="/" replace />

  const profil = PROFILS.find((p) => p.id === profilChoisi) ?? null

  function soumettre(e) {
    e.preventDefault()
    if (!profil) {
      setErreur('Choisissez un profil pour préremplir vos identifiants.')
      return
    }
    setErreur('')
    setEnCours(true)
    // Légère latence pour rendre la démonstration crédible
    setTimeout(() => {
      connecter(profil.id)
      navigate('/', { replace: true })
    }, 700)
  }

  return (
    <section className="mx-auto flex max-w-3xl flex-col px-4 py-16 sm:px-6">
      <Link
        to="/"
        className="mb-8 flex items-center gap-1.5 self-start text-sm font-medium text-primary-700 hover:text-primary-800 dark:text-primary-300"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au site
      </Link>

      <div className="mb-8 text-center">
        <Logo className="mx-auto h-14 w-14" />
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">Espace Technital</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Accédez à l'application de gestion du contrôle technique.
        </p>
      </div>

      <Card className="p-6 sm:p-8">
        <form onSubmit={soumettre}>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Je me connecte en tant que</p>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
            Sélectionnez un profil : vos identifiants de démonstration sont remplis automatiquement.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {PROFILS.map((p) => {
              const Icone = ICONES[p.icone]
              const actif = p.id === profilChoisi
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setProfilChoisi(p.id)
                    setErreur('')
                  }}
                  aria-pressed={actif}
                  className={`flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition-colors ${
                    actif
                      ? 'border-primary-700 bg-primary-50 dark:border-primary-400 dark:bg-primary-950'
                      : 'border-slate-200 bg-white hover:border-primary-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-600'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      actif
                        ? 'bg-primary-700 text-white dark:bg-primary-500'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <Icone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-900 dark:text-white">{p.role}</span>
                    <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{p.description}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
              Identifiant
              <span className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={profil?.identifiant ?? ''}
                  readOnly
                  placeholder="Choisissez un profil ci-dessus"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                />
              </span>
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
              Mot de passe
              <span className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={profil?.motDePasse ?? ''}
                  readOnly
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                />
              </span>
            </label>
          </div>

          {erreur && <p className="mt-4 text-sm font-medium text-red-600">{erreur}</p>}

          <button
            type="submit"
            disabled={enCours}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-700 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:opacity-70 dark:bg-primary-600 dark:hover:bg-primary-500"
          >
            {enCours ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Connexion…
              </>
            ) : (
              <>
                Connexion <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary-200 bg-primary-50 p-4 text-xs text-primary-900 dark:border-primary-900 dark:bg-primary-950 dark:text-primary-100">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          Démonstration : aucun compte réel n'est utilisé et aucune donnée n'est transmise. Les identifiants sont
          fictifs et les trois espaces s'appuient sur des données simulées.
        </div>
      </Card>
    </section>
  )
}
