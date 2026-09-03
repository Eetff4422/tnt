import { useEffect, useState } from 'react'
import useInView from '../../hooks/useInView.js'

// Compteur animé : la valeur monte de 0 jusqu'à `valeur` quand le bloc devient visible.
export default function CountUp({ valeur, suffixe = '', duree = 1400, className = '' }) {
  const [ref, visible] = useInView()
  const [affichage, setAffichage] = useState(0)

  useEffect(() => {
    if (!visible) return

    let frame
    const depart = performance.now()

    const animer = (maintenant) => {
      const progression = Math.min((maintenant - depart) / duree, 1)
      // Courbe d'accélération douce (ease-out cubique)
      const adouci = 1 - Math.pow(1 - progression, 3)
      setAffichage(Math.round(valeur * adouci))
      if (progression < 1) frame = requestAnimationFrame(animer)
    }

    frame = requestAnimationFrame(animer)
    return () => cancelAnimationFrame(frame)
  }, [visible, valeur, duree])

  return (
    <span ref={ref} className={className}>
      {affichage.toLocaleString('fr-FR')}
      {suffixe}
    </span>
  )
}
