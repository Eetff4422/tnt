import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Card from '../ui/Card.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'

const QUESTIONS = [
  {
    question: 'Que se passe-t-il si mon véhicule est déclaré non conforme ?',
    reponse:
      "Les anomalies constatées vous sont remises par écrit à l'issue de la visite. Après réparation, votre véhicule repasse en contre-visite, à tarif réduit, pour vérifier uniquement les points signalés.",
  },
  {
    question: 'Dois-je obligatoirement prendre rendez-vous ?',
    reponse:
      "Non, le centre accueille aussi les visites sans rendez-vous. Le pré-enregistrement en ligne reste toutefois le meilleur moyen d'éviter l'attente aux bancs de test, en particulier le samedi matin.",
  },
  {
    question: 'Quels documents dois-je présenter au guichet ?',
    reponse:
      "La carte grise, l'attestation d'assurance en cours de validité, la quittance TVM si elle est applicable à votre véhicule, et l'ancienne attestation de visite technique en cas de renouvellement. Les originaux sont exigés.",
  },
  {
    question: 'Combien de temps dure une visite technique ?',
    reponse:
      "Comptez en moyenne 30 à 45 minutes pour un véhicule léger : contrôle administratif au guichet, passage sur bancs de test, puis inspection sur fosse. Les poids lourds demandent généralement un peu plus de temps.",
  },
  {
    question: "Le contrôle est-il obligatoire pour un véhicule personnel ?",
    reponse:
      "Oui. Le contrôle technique concerne l'ensemble des véhicules en circulation, particuliers comme professionnels. Les véhicules de transport public et commercial font l'objet d'un suivi renforcé dans le cadre de la convention avec la Mairie de Libreville.",
  },
]

export default function Faq() {
  const [ouverte, setOuverte] = useState(0)

  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Questions fréquentes"
        title="Tout ce qu'il faut savoir avant de venir"
        align="center"
      />

      <div className="mx-auto max-w-3xl space-y-3">
        {QUESTIONS.map((item, index) => {
          const active = ouverte === index
          return (
            <Card key={item.question} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setOuverte(active ? -1 : index)}
                aria-expanded={active}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${active ? 'rotate-180' : ''}`}
                />
              </button>
              {active && (
                <p className="border-t border-slate-100 px-5 py-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
                  {item.reponse}
                </p>
              )}
            </Card>
          )
        })}
      </div>
    </section>
  )
}
