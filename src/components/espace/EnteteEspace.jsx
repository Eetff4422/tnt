// Bandeau d'en-tête commun aux trois espaces de l'application.
export default function EnteteEspace({ titre, sousTitre, children }) {
  return (
    <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">{titre}</h1>
          {sousTitre && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{sousTitre}</p>}
        </div>
        {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
      </div>
    </div>
  )
}
