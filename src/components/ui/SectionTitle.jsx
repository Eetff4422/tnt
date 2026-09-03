// `sombre` : à utiliser lorsque la section a un fond sombre dans les deux thèmes,
// afin que le titre ne reste pas en encre foncée sur fond foncé.
export default function SectionTitle({ eyebrow, title, description, align = 'left', sombre = false }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'

  const couleurEyebrow = sombre ? 'text-primary-300' : 'text-primary-600 dark:text-primary-300'
  const couleurTitre = sombre ? 'text-white' : 'text-slate-900 dark:text-white'
  const couleurDescription = sombre ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'

  return (
    <div className={`mb-10 max-w-2xl ${alignment}`}>
      {eyebrow && <p className={`mb-2 text-sm font-semibold uppercase tracking-wide ${couleurEyebrow}`}>{eyebrow}</p>}
      <h2 className={`text-3xl font-bold sm:text-4xl ${couleurTitre}`}>{title}</h2>
      {description && <p className={`mt-3 ${couleurDescription}`}>{description}</p>}
    </div>
  )
}
