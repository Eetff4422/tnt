// Styles partagés associés aux statuts de visite technique / attestation
export const STATUT_STYLES = {
  valide: {
    label: 'Valide',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    solid: 'bg-emerald-600',
  },
  expire_bientot: {
    label: 'Expire bientôt',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    solid: 'bg-amber-500',
  },
  expire: {
    label: 'Expiré',
    text: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    dot: 'bg-red-500',
    solid: 'bg-red-600',
  },
}

// Styles du sélecteur Conforme / Avertissement / Non-Conforme (check-list agent)
export const CONTROLE_STYLES = {
  conforme: { label: 'Conforme', active: 'bg-emerald-600 text-white border-emerald-600', icon: 'CheckCircle2' },
  avertissement: { label: 'Avertissement', active: 'bg-amber-500 text-white border-amber-500', icon: 'AlertTriangle' },
  non_conforme: { label: 'Non conforme', active: 'bg-red-600 text-white border-red-600', icon: 'XCircle' },
}

export const CATEGORIE_ICONS = { leger: 'Car', taxi: 'Bus', 'poids-lourd': 'Truck' }
