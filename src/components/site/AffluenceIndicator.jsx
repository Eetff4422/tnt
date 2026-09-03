import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'

// Indicateur mocké — cycle entre quelques presets pour simuler un flux "en direct"
const NIVEAUX = [
  { niveau: 'Affluence faible', attente: '5 min', dot: 'bg-emerald-400' },
  { niveau: 'Affluence modérée', attente: '15 min', dot: 'bg-amber-400' },
  { niveau: 'Affluence élevée', attente: '30 min', dot: 'bg-red-400' },
]

export default function AffluenceIndicator() {
  const [index, setIndex] = useState(1)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % NIVEAUX.length), 20000)
    return () => clearInterval(id)
  }, [])

  const current = NIVEAUX[index]

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur">
      <span className="relative flex h-2.5 w-2.5">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${current.dot}`} />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${current.dot}`} />
      </span>
      <span className="flex items-center gap-1.5 text-sm font-medium text-white">
        <Users className="h-4 w-4 text-primary-200" />
        {current.niveau} aux Trois Quartiers — Temps d'attente estimé : {current.attente}
      </span>
    </div>
  )
}
