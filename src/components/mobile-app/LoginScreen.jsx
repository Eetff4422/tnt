import { useState } from 'react'
import { ArrowRight, Loader2, ShieldCheck, Smartphone } from 'lucide-react'

// Écran d'accueil / connexion de l'application mobile (maquette, aucune authentification réelle).
export default function LoginScreen({ onConnexion }) {
  const [enCours, setEnCours] = useState(false)

  function connecter() {
    setEnCours(true)
    setTimeout(() => onConnexion(), 900)
  }

  return (
    <div className="flex h-full flex-col justify-between bg-gradient-to-b from-primary-800 to-primary-950 px-6 py-10 text-white">
      <div className="mt-6 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
          <ShieldCheck className="h-8 w-8" />
        </span>
        <p className="mt-4 text-xl font-extrabold">Technital</p>
        <p className="text-xs text-primary-200">Libreville</p>
        <p className="mt-4 text-xs leading-relaxed text-primary-100">
          Suivez vos visites techniques, recevez vos rappels et payez en Mobile Money.
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-[11px] font-medium text-primary-100">
          Numéro de téléphone
          <div className="mt-1 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 backdrop-blur">
            <Smartphone className="h-4 w-4 text-primary-200" />
            <input
              defaultValue="066 85 60 46"
              className="w-full bg-transparent text-sm text-white placeholder:text-primary-200 focus:outline-none"
              aria-label="Numéro de téléphone"
            />
          </div>
        </label>

        <button
          type="button"
          onClick={connecter}
          disabled={enCours}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-primary-800 disabled:opacity-70"
        >
          {enCours ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Connexion…
            </>
          ) : (
            <>
              Se connecter <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-primary-200">
          Vous recevrez un code de vérification par SMS.
        </p>
      </div>
    </div>
  )
}
