// Profils de démonstration de l'application de gestion.
// Identifiants factices : aucune authentification réelle, tout est simulé côté client.
export const PROFILS = [
  {
    id: 'automobiliste',
    role: 'Automobiliste',
    nom: 'Jean Ndong',
    fonction: 'Propriétaire de flotte',
    identifiant: 'jean.ndong',
    motDePasse: 'demo1234',
    icone: 'Car',
    description: 'Suivez vos véhicules, vos échéances et vos paiements.',
  },
  {
    id: 'agent',
    role: 'Agent de contrôle',
    nom: 'Sylvie Mbina',
    fonction: 'Poste fosse & bancs de test',
    identifiant: 'agent.mbina',
    motDePasse: 'demo1234',
    icone: 'ClipboardCheck',
    description: 'Traitez la file du jour et saisissez vos inspections.',
  },
  {
    id: 'mairie',
    role: 'Mairie de Libreville',
    nom: 'Direction des Transports',
    fonction: 'Suivi de la conformité urbaine',
    identifiant: 'mairie.transports',
    motDePasse: 'demo1234',
    icone: 'Landmark',
    description: 'Consultez les indicateurs de conformité de la commune.',
  },
]

export function getProfil(id) {
  return PROFILS.find((p) => p.id === id) ?? null
}
