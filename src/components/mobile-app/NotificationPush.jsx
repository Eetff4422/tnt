import { ShieldAlert, X } from 'lucide-react'

// Notification push simulée, affichée en surimpression dans la coque du téléphone.
export default function NotificationPush({ onFermer }) {
  return (
    <div className="fixed inset-x-0 top-0 z-40 px-3 pt-9">
      <div className="animate-[glisser_0.45s_ease-out] rounded-2xl bg-white/95 p-3 shadow-lg backdrop-blur">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <ShieldAlert className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-slate-900">Technital</p>
              <button type="button" onClick={onFermer} aria-label="Fermer la notification">
                <X className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-700">
              Le contrôle technique du <span className="font-semibold">Camion Isuzu NPR</span> expire dans 15 jours.
              Réservez votre créneau dès maintenant.
            </p>
            <p className="mt-1 text-[10px] text-slate-400">maintenant</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glisser {
          from { transform: translateY(-16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
