// File des véhicules attendus au centre sur la journée — vue agent de contrôle.
export const FILE_INSPECTION = [
  {
    id: 1,
    creneau: '07h30',
    immatriculation: 'LBV 4521 GA',
    vehicule: 'Toyota Corolla',
    categorie: 'taxi',
    proprietaire: 'Jean Ndong',
    etat: 'termine',
  },
  {
    id: 2,
    creneau: '08h15',
    immatriculation: 'LBV 7788 GA',
    vehicule: 'Isuzu NPR',
    categorie: 'poids-lourd',
    proprietaire: 'Coopérative Estuaire',
    etat: 'en_cours',
  },
  {
    id: 3,
    creneau: '09h00',
    immatriculation: 'LBV 1190 GA',
    vehicule: 'Toyota Hiace',
    categorie: 'taxi',
    proprietaire: 'Transports Akébé',
    etat: 'attente',
  },
  {
    id: 4,
    creneau: '09h45',
    immatriculation: 'LBV 3305 GA',
    vehicule: 'Renault Clio',
    categorie: 'leger',
    proprietaire: 'Marie Obame',
    etat: 'attente',
  },
  {
    id: 5,
    creneau: '10h30',
    immatriculation: 'LBV 6042 GA',
    vehicule: 'Mitsubishi Canter',
    categorie: 'poids-lourd',
    proprietaire: 'SARL Bâti-Gabon',
    etat: 'attente',
  },
]

export const ETATS_FILE = {
  termine: { label: 'Terminé', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  en_cours: { label: 'En cours', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  attente: { label: 'En attente', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
}

// Derniers contrôles clôturés — vue Mairie
export const DERNIERS_CONTROLES = [
  { id: 1, heure: '11h20', immatriculation: 'LBV 4521 GA', categorie: 'Taxi', resultat: 'conforme' },
  { id: 2, heure: '10h55', immatriculation: 'LBV 8834 GA', categorie: 'Minibus', resultat: 'conforme' },
  { id: 3, heure: '10h30', immatriculation: 'LBV 7788 GA', categorie: 'Poids lourd', resultat: 'non_conforme' },
  { id: 4, heure: '09h48', immatriculation: 'LBV 2261 GA', categorie: 'Taxi', resultat: 'conforme' },
  { id: 5, heure: '09h12', immatriculation: 'LBV 5510 GA', categorie: 'Bus urbain', resultat: 'avertissement' },
]
