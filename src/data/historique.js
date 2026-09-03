// Historique mocké des visites techniques d'un client de l'app mobile.
export const HISTORIQUE_VISITES = [
  {
    id: 1,
    vehicule: 'Taxi Toyota Corolla',
    immatriculation: 'LBV 4521 GA',
    date: '12/03/2026',
    resultat: 'conforme',
    montant: 17000,
  },
  {
    id: 2,
    vehicule: 'Renault Clio',
    immatriculation: 'LBV 3305 GA',
    date: '19/01/2026',
    resultat: 'conforme',
    montant: 16000,
  },
  {
    id: 3,
    vehicule: 'Camion Isuzu NPR',
    immatriculation: 'LBV 7788 GA',
    date: '28/08/2025',
    resultat: 'contre_visite',
    montant: 22000,
  },
  {
    id: 4,
    vehicule: 'Minibus Toyota Hiace',
    immatriculation: 'LBV 1190 GA',
    date: '02/06/2025',
    resultat: 'conforme',
    montant: 19000,
  },
]

export const RESULTAT_STYLES = {
  conforme: { label: 'Conforme', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  contre_visite: { label: 'Contre-visite', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
}
