// Articles mockés — contenu 100% original, rédigé pour Technital.
export const ACTUALITES = [
  {
    slug: 'preparer-son-vehicule-au-controle',
    titre: '5 vérifications à faire avant votre contrôle technique',
    date: '2026-08-10',
    categorie: 'Conseils',
    extrait:
      "Un simple coup d'œil avant de venir au centre peut vous éviter une contre-visite. Voici les points les plus souvent à l'origine d'un refus.",
    contenu: [
      "La grande majorité des contre-visites à Technital concerne des points faciles à anticiper : feux et clignotants hors service, plaquettes de frein usées, pneus sous le seuil légal ou pare-brise fissuré dans le champ de vision du conducteur.",
      "Avant de prendre rendez-vous, faites le tour de votre véhicule : testez tous les feux (position, croisement, route, stop, clignotants, feu de recul), vérifiez la pression et l'usure de vos pneus, et assurez-vous que les essuie-glaces ne laissent pas de traces.",
      "Pensez aussi aux documents : carte grise, attestation d'assurance en cours de validité et quittance TVM si applicable. Un dossier complet au guichet accélère nettement le passage sur bancs de test.",
    ],
  },
  {
    slug: 'tvm-ce-qu-il-faut-savoir',
    titre: 'Taxe sur les véhicules à moteur (TVM) : ce qu\'il faut savoir',
    date: '2026-07-22',
    categorie: 'Réglementation',
    extrait:
      "La quittance TVM fait partie des pièces demandées au guichet pour certaines catégories de véhicules. Rappel des règles applicables à Libreville.",
    contenu: [
      "La taxe sur les véhicules à moteur (TVM) participe au financement des infrastructures routières et de la sécurité routière. Sa quittance est demandée, lorsqu'elle est applicable, au moment du contrôle administratif qui précède le passage sur bancs de test.",
      "Pour éviter tout blocage le jour du rendez-vous, il est recommandé de vérifier la validité de sa quittance en amont, au même titre que l'assurance automobile et la carte grise.",
      "En cas de doute sur votre situation, notre équipe au guichet des Trois Quartiers peut vous orienter vers les services compétents avant de lancer la visite technique.",
    ],
  },
  {
    slug: 'securite-routiere-transport-urbain',
    titre: 'Transport urbain : pourquoi le contrôle technique est un enjeu collectif',
    date: '2026-06-30',
    categorie: 'Sécurité routière',
    extrait:
      "Taxis, minibus et bus assurent une part majeure des déplacements à Libreville. Leur conformité technique protège directement les usagers du quotidien.",
    contenu: [
      "Dans le cadre de la convention qui lie Technital à la Mairie de Libreville, une attention particulière est portée aux véhicules de transport public et commercial : taxis, minibus, bus urbains et poids lourds.",
      "Ces véhicules circulent plus longtemps et transportent davantage de passagers que la moyenne : un défaut de freinage ou une usure excessive des pneumatiques y présente un risque démultiplié.",
      "Le renforcement des contrôles sur ce segment s'inscrit dans un objectif partagé avec les autorités municipales : réduire les accidents liés à l'état des véhicules sur les grands axes de la ville.",
    ],
  },
  {
    slug: 'nouveau-creneau-samedi-matin',
    titre: "Rappel : le centre reste ouvert le samedi matin",
    date: '2026-06-05',
    categorie: 'Actualité du centre',
    extrait:
      "Pour répondre à la demande, Technital accueille les automobilistes le samedi de 8h à 12h, en plus des horaires habituels en semaine.",
    contenu: [
      "Beaucoup d'automobilistes nous demandent une alternative aux horaires de semaine. Le centre des Trois Quartiers est ouvert chaque samedi de 8h00 à 12h00, en complément du Lundi–Vendredi 7h30–15h30.",
      "L'affluence y est généralement plus élevée qu'en semaine : la prise de rendez-vous en ligne reste le moyen le plus sûr d'obtenir un créneau et d'éviter l'attente sur place.",
      "Le service de pré-enregistrement du site permet de réserver un créneau du samedi matin en quelques minutes, en indiquant simplement l'immatriculation et la catégorie du véhicule.",
    ],
  },
]

export function getActualiteBySlug(slug) {
  return ACTUALITES.find((a) => a.slug === slug) ?? null
}

export function formatDateArticle(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}
