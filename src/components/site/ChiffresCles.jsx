import CountUp from '../ui/CountUp.jsx'
import Reveal from '../ui/Reveal.jsx'

// Chiffres de démonstration — à remplacer par les données réelles de Technital.
const CHIFFRES = [
  { valeur: 12, suffixe: '+', label: "années d'activité à Libreville" },
  { valeur: 15000, suffixe: '+', label: 'véhicules contrôlés par an' },
  { valeur: 96, suffixe: '%', label: 'de visites traitées le jour même' },
  { valeur: 15, suffixe: ' min', label: "temps d'attente moyen avec RDV" },
]

export default function ChiffresCles() {
  return (
    <section className="bg-slate-50 py-14 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CHIFFRES.map((chiffre, index) => (
            <Reveal key={chiffre.label} delay={index * 90}>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-primary-800 dark:text-primary-300 sm:text-4xl">
                  <CountUp valeur={chiffre.valeur} suffixe={chiffre.suffixe} />
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{chiffre.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
