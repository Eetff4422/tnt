import { Quote, Star } from 'lucide-react'
import Card from '../ui/Card.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Reveal from '../ui/Reveal.jsx'

// Témoignages de démonstration — à remplacer par de vrais avis clients.
const TEMOIGNAGES = [
  {
    nom: 'Patrick M.',
    profil: 'Chauffeur de taxi, Libreville',
    note: 5,
    texte:
      "Avec le rendez-vous en ligne, je passe le contrôle en début de matinée et je reprends la route avant 9h. Avant, j'y laissais une demi-journée.",
  },
  {
    nom: 'Sylvie A.',
    profil: 'Particulière, quartier Glass',
    note: 5,
    texte:
      "Le simulateur m'a permis de savoir exactement quels documents apporter et combien j'allais payer. Aucune mauvaise surprise au guichet.",
  },
  {
    nom: 'Jean-Claude O.',
    profil: 'Gestionnaire de flotte, 14 véhicules',
    note: 4,
    texte:
      "Suivre les échéances de toute ma flotte au même endroit m'évite les oublis. Les rappels avant expiration sont ce qui me manquait le plus.",
  },
]

export default function Temoignages() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Ils nous font confiance"
          title="Ce que disent les automobilistes"
          description="Particuliers, taxis et gestionnaires de flotte passent chaque jour par le centre des Trois Quartiers."
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {TEMOIGNAGES.map((temoignage, index) => (
            <Reveal key={temoignage.nom} delay={index * 120}>
              <Card className="flex h-full flex-col p-6">
                <Quote className="h-6 w-6 text-primary-300 dark:text-primary-500" />
                <p className="mt-3 flex-1 text-sm text-slate-700 dark:text-slate-300">« {temoignage.texte} »</p>

                <div className="mt-4 flex items-center gap-1" aria-label={`Note : ${temoignage.note} sur 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < temoignage.note ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{temoignage.nom}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{temoignage.profil}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
