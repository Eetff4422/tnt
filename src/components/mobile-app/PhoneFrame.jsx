// Coque de smartphone réutilisable. `transform` sur le bezel crée un containing
// block pour les descendants en `position: fixed` (feuilles, modales, notifications)
// afin qu'ils restent confinés à l'écran du téléphone.
export default function PhoneFrame({ children, tabBar, overlay, pleinEcran = false }) {
  return (
    <div className="mx-auto w-[320px]">
      <div className="relative transform overflow-hidden rounded-[2.75rem] border-[10px] border-slate-900 bg-slate-900 shadow-phone">
        <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-900" />

        <div className={`relative flex h-[640px] flex-col ${pleinEcran ? 'bg-primary-900' : 'bg-slate-50'}`}>
          <div
            className={`flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold ${
              pleinEcran ? 'text-white' : 'text-slate-900'
            }`}
          >
            <span>09:41</span>
            <span className="flex items-center gap-1">
              <span className={`h-1.5 w-1.5 rounded-full ${pleinEcran ? 'bg-white' : 'bg-slate-900'}`} />
              <span className={`h-1.5 w-1.5 rounded-full ${pleinEcran ? 'bg-white' : 'bg-slate-900'}`} />
              <span className={`h-1.5 w-1.5 rounded-full ${pleinEcran ? 'bg-white' : 'bg-slate-900'}`} />
            </span>
          </div>

          <div className={`flex-1 overflow-y-auto ${pleinEcran ? '' : 'px-4 pb-2'}`}>{children}</div>

          {tabBar}

          <div className={`flex justify-center pb-2 pt-1 ${pleinEcran ? '' : 'bg-white'}`}>
            <div className={`h-1 w-28 rounded-full ${pleinEcran ? 'bg-white/40' : 'bg-slate-300'}`} />
          </div>

          {overlay}
        </div>
      </div>
    </div>
  )
}
