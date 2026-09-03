// Les 3 étapes du parcours de visite technique
export const ETAPES_VISITE = [
  {
    id: 1,
    titre: 'Contrôle administratif',
    description: 'Vérification des pièces justificatives au guichet et contrôle de la concordance du numéro de châssis.',
    icon: 'ClipboardCheck',
  },
  {
    id: 2,
    titre: 'Passage sur bancs de test',
    description: 'Évaluation automatisée et mesurée du freinage, du parallélisme et des suspensions.',
    icon: 'Gauge',
  },
  {
    id: 3,
    titre: 'Inspection visuelle sur fosse',
    description: 'Examen sous le véhicule de la structure globale, de la carrosserie et des éléments mécaniques inférieurs.',
    icon: 'Wrench',
  },
]

// Points de contrôle spécifiques selon la catégorie du véhicule
export const POINTS_CONTROLE_PAR_CATEGORIE = {
  leger: ['Système de freinage', 'Direction', 'Suspensions', 'Pneumatiques', 'Équipements de signalisation'],
  taxi: ['Système de freinage', 'Direction', 'Suspensions', 'Essieux', 'Pneumatiques', 'Équipements de signalisation'],
  'poids-lourd': [
    'Système de freinage',
    'Direction',
    'Suspensions',
    'Essieux',
    'Structure du châssis',
    'Pneumatiques',
    'Équipements de signalisation',
  ],
}
