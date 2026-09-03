// Grille tarifaire officielle (barèmes du Ministère des Transports)
export const CATEGORIES = [
  {
    id: 'leger',
    label: 'Léger',
    labelLong: 'Véhicule léger / particulier',
    icon: 'Car',
    tarifMin: 16000,
    tarifMax: 16000,
    description: 'Véhicules particuliers et légers',
  },
  {
    id: 'taxi',
    label: 'Taxi / Minibus',
    labelLong: 'Utilitaire, taxi ou minibus',
    icon: 'Bus',
    tarifMin: 16000,
    tarifMax: 19000,
    description: 'Utilitaires, taxis et minibus',
  },
  {
    id: 'poids-lourd',
    label: 'Poids lourd',
    labelLong: 'Poids lourd / gros porteur',
    icon: 'Truck',
    tarifMin: 19000,
    tarifMax: 22000,
    description: 'Camions, bus et gros porteurs',
  },
]

export const PIECES_REQUISES = [
  { id: 'carte-grise', label: 'Carte grise (certificat d’immatriculation)', icon: 'FileText' },
  { id: 'assurance', label: 'Attestation d’assurance en cours de validité', icon: 'ShieldCheck' },
  { id: 'tvm', label: 'Quittance TVM (taxe sur les véhicules à moteur), si applicable', icon: 'Receipt' },
  { id: 'ancienne-attestation', label: 'Ancienne attestation de visite technique (renouvellement)', icon: 'FileClock' },
]

export function formatFCFA(montant) {
  return `${montant.toLocaleString('fr-FR')} FCFA`
}

export function getCategorie(id) {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0]
}
