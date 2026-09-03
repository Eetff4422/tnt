// Illustration originale : véhicule sur pont élévateur + points de contrôle validés.
export default function HeroIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 420 320" className={className} role="img" aria-label="Véhicule sur pont élévateur en cours d'inspection">
      {/* Halo de fond */}
      <circle cx="215" cy="140" r="118" fill="#ffffff" opacity="0.06" />
      <circle cx="215" cy="140" r="86" fill="#ffffff" opacity="0.05" />

      {/* Carrosserie */}
      <path
        d="M112 148c4-20 12-33 22-38 20-9 72-9 92 0 10 5 20 18 26 38z"
        fill="#ffffff"
        opacity="0.92"
      />
      <path d="M104 150h212a8 8 0 0 1 8 8v22a8 8 0 0 1-8 8H104a8 8 0 0 1-8-8v-22a8 8 0 0 1 8-8z" fill="#e2e8f0" />
      {/* Vitres */}
      <path d="M140 144c3-13 7-22 13-25 16-6 58-6 74 0 6 3 11 12 14 25z" fill="#1a4474" opacity="0.85" />
      <line x1="210" y1="116" x2="210" y2="144" stroke="#e2e8f0" strokeWidth="3" />

      {/* Roues */}
      <circle cx="146" cy="188" r="20" fill="#0f172a" />
      <circle cx="146" cy="188" r="8" fill="#94a3b8" />
      <circle cx="276" cy="188" r="20" fill="#0f172a" />
      <circle cx="276" cy="188" r="8" fill="#94a3b8" />

      {/* Pont élévateur */}
      <rect x="86" y="212" width="248" height="12" rx="6" fill="#ffffff" opacity="0.35" />
      <rect x="196" y="224" width="28" height="52" rx="6" fill="#ffffff" opacity="0.28" />
      <rect x="150" y="276" width="120" height="12" rx="6" fill="#ffffff" opacity="0.35" />

      {/* Pastilles de conformité */}
      <g>
        <circle cx="92" cy="96" r="20" fill="#10b981" />
        <path d="M84 96l6 6 12-13" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g>
        <circle cx="336" cy="118" r="20" fill="#10b981" />
        <path d="M328 118l6 6 12-13" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Cadran de banc de test */}
      <g transform="translate(330 214)">
        <circle cx="0" cy="0" r="30" fill="#ffffff" opacity="0.92" />
        <path d="M-20 6a20 20 0 0 1 40 0" fill="none" stroke="#1a4474" strokeWidth="4" strokeLinecap="round" />
        <line x1="0" y1="6" x2="12" y2="-8" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="0" cy="6" r="3" fill="#1a4474" />
      </g>
    </svg>
  )
}
