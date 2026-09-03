import { Link } from 'react-router-dom'
import { CheckCircle2, Circle, Clock, Rocket } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Reveal from '../components/ui/Reveal.jsx'

const PHASES = [
  {
    phase: 'Phase 1',
    statut: 'fait',
    titre: 'Vitrine et pré-enregistrement en ligne',
    delai: 'Prototype actuel',
    elements: [
      'Simulateur de visite par catégorie de véhicule',
      'Pré-enregistrement avec choix du créneau et QR code',
      "Vérification en ligne de la validité d'une attestation",
      'Maquette interactive des trois profils de l\'application mobile',
    ],
  },
  {
    phase: 'Phase 2',
    statut: 'encours',
    titre: 'Passage en service réel',
    delai: 'Prochaine étape',
    elements: [
      'Base de données des véhicules et des attestations',
      'Agenda de rendez-vous synchronisé avec les postes de contrôle',
      'Confirmation par SMS et rappel avant expiration',
      'Espace client web avec historique des visites',
    ],
  },
  {
    phase: 'Phase 3',
    statut: 'prevu',
    titre: 'Application mobile et paiement',
    delai: 'À moyen terme',
    elements: [
      'Publication des applications iOS et Android',
      'Paiement Mobile Money intégré (Airtel Money, Moov Money)',
      'Application agent hors ligne pour la fosse et les bancs de test',
      'Signature et délivrance dématérialisée de l\'attestation',
    ],
  },
  {
    phase: 'Phase 4',
    statut: 'prevu',
    titre: 'Interconnexion institutionnelle',
    delai: 'Vision long terme',
    elements: [
      'Tableau de bord dédié à la Mairie de Libreville',
      'Échange de données avec les services de transport',
      'Statistiques de conformité par catégorie et par quartier',
      'Indicateurs de sécurité routière à l\'échelle de la commune',
    ],
  },
]

const STATUTS = {
  fait: { label: 'Livré', icon: CheckCircle2, classe: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30' },
  encours: { label: 'Prochaine étape', icon: Clock, classe: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30' },
  prevu: { label: 'Planifié', icon: Circle, classe: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' },
}

export default function VisionProduit() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-900 to-primary-800 py-16 text-white dark:from-slate-950 dark:to-primary-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary-200">
            <Rocket className="h-4 w-4" /> Vision produit
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            De la maquette au service numérique complet
          </h1>
          <p className="mt-4 max-w-2xl text-primary-100">
            Ce prototype constitue la première étape d'une plateforme complète destinée aux automobilistes, aux agents
            de contrôle et à la Mairie de Libreville. Voici la trajectoire envisagée.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Feuille de route"
          title="Quatre phases de déploiement"
          description="Chaque phase apporte une valeur immédiate, sans dépendre de la suivante."
        />

        <div className="space-y-6">
          {PHASES.map((phase, index) => {
            const statut = STATUTS[phase.statut]
            return (
              <Reveal key={phase.phase} delay={index * 100}>
                <Card className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">
                        {phase.phase} · {phase.delai}
                      </p>
                      <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{phase.titre}</h2>
                    </div>
                    <span
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statut.classe}`}
                    >
                      <statut.icon className="h-3.5 w-3.5" /> {statut.label}
                    </span>
                  </div>

                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {phase.elements.map((element) => (
                      <li key={element} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                        {element}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">
            Le prototype actuel est entièrement fonctionnel côté interface : les données affichées sont simulées, en
            attente du raccordement au système d'information de Technital.
          </p>
          <Button as={Link} to="/#app-mobile" variant="primary">
            Revoir la maquette mobile
          </Button>
        </div>
      </section>
    </div>
  )
}
