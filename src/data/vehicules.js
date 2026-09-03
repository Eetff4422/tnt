// Mock "Ma Flotte" — véhicules enregistrés par un client de l'app mobile
export const VEHICULES_FLOTTE = [
  {
    id: 1,
    nom: 'Taxi Toyota Corolla',
    immatriculation: 'LBV 4521 GA',
    categorie: 'taxi',
    statut: 'valide',
    dateExpiration: '12/03/2027',
  },
  {
    id: 2,
    nom: 'Camion Isuzu NPR',
    immatriculation: 'LBV 7788 GA',
    categorie: 'poids-lourd',
    statut: 'expire_bientot',
    dateExpiration: '28/08/2026',
  },
  {
    id: 3,
    nom: 'Minibus Toyota Hiace',
    immatriculation: 'LBV 1190 GA',
    categorie: 'taxi',
    statut: 'expire',
    dateExpiration: '02/06/2026',
  },
  {
    id: 4,
    nom: 'Renault Clio (véhicule personnel)',
    immatriculation: 'LBV 3305 GA',
    categorie: 'leger',
    statut: 'valide',
    dateExpiration: '19/01/2027',
  },
]
