// Logo Technital — marque originale.
// Lecture : hexagone de boulonnerie (mécanique) + monogramme « T » + coche de conformité.
// Géométrie : hexagone régulier de rayon 25 centré en (32,32), coins arrondis via
// un contour de même couleur (stroke-linejoin="round").
const SOMMETS = '57,32 44.5,53.65 19.5,53.65 7,32 19.5,10.35 44.5,10.35'

const TONS = {
  // Sur fond clair
  marque: { hexagone: '#1a4474', monogramme: '#ffffff', coche: '#34d399' },
  // Sur fond sombre : hexagone éclairci pour rester lisible
  clair: { hexagone: '#2f6fae', monogramme: '#ffffff', coche: '#34d399' },
  // Version d'impression / monochrome
  mono: { hexagone: 'currentColor', monogramme: '#ffffff', coche: '#ffffff' },
}

export default function Logo({ className = 'h-9 w-9', ton = 'marque', avecCoche = true }) {
  const couleurs = TONS[ton] ?? TONS.marque

  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Logo Technital">
      <polygon
        points={SOMMETS}
        fill={couleurs.hexagone}
        stroke={couleurs.hexagone}
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Monogramme T : barre horizontale + jambage.
          Le jambage s'arrête à mi-hauteur pour dégager la coche. */}
      <rect x="17.5" y="17" width="29" height="7" rx="3.5" fill={couleurs.monogramme} />
      <rect x="28.5" y="17" width="7" height="15" rx="3.5" fill={couleurs.monogramme} />

      {/* Coche de conformité : passe sous le jambage et remonte à sa droite */}
      {avecCoche && (
        <path
          d="M21 40 L28.5 47.5 L46 30"
          fill="none"
          stroke={couleurs.coche}
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}
