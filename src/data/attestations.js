// Mock base de vérification des attestations — recherche par immatriculation
const ATTESTATIONS = {
  'LBV 4521 GA': { statut: 'valide', dateVisite: '12/03/2026', dateExpiration: '12/03/2027', categorie: 'Taxi / Minibus' },
  'LBV 3305 GA': { statut: 'valide', dateVisite: '19/01/2026', dateExpiration: '19/01/2027', categorie: 'Véhicule léger' },
  'LBV 1190 GA': { statut: 'expire', dateVisite: '02/06/2025', dateExpiration: '02/06/2026', categorie: 'Taxi / Minibus' },
  'LBV 7788 GA': { statut: 'expire_bientot', dateVisite: '28/08/2025', dateExpiration: '28/08/2026', categorie: 'Poids lourd' },
}

function normaliserImmatriculation(valeur) {
  return valeur.trim().toUpperCase().replace(/\s+/g, ' ')
}

export function rechercherAttestation(immatriculation) {
  const cle = normaliserImmatriculation(immatriculation)
  return ATTESTATIONS[cle] ?? null
}

export const EXEMPLE_IMMATRICULATION = 'LBV 4521 GA'
