// Logo original Technital : bouclier (sécurité) + coche de conformité.
export default function Logo({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Logo Technital">
      <rect width="64" height="64" rx="14" className="fill-primary-700" />
      <path
        d="M32 12 46 18v13c0 9.5-6 17.2-14 20-8-2.8-14-10.5-14-20V18z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
        className="text-white"
      />
      <path
        d="M24.5 32.5 30 38l10-11"
        fill="none"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        className="text-emerald-400"
      />
    </svg>
  )
}
