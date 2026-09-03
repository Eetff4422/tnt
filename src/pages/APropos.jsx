import { ShieldCheck, Gauge, Users, MapPin } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Button from '../components/ui/Button.jsx'
import { Link } from 'react-router-dom'

const CHIFFRES = [
  { valeur: '12+', label: "années d'activité à Libreville" },
  { valeur: '15 000+', label: 'véhicules contrôlés par an' },
  { valeur: '3', label: 'catégories de véhicules inspectées' },
  { valeur: '1', label: 'convention avec la Mairie de Libreville' },
]

const VALEURS = [
  {
    icon: ShieldCheck,
    titre: 'Rigueur',
    description: "Chaque véhicule suit le même parcours de contrôle, sans exception : guichet, bancs de test, fosse.",
  },
  {
    icon: Gauge,
    titre: 'Exactitude',
    description: 'Des équipements de mesure calibrés pour le freinage, le parallélisme et les suspensions.',
  },
  {
    icon: Users,
    titre: 'Service',
    description: "Un accueil clair, des tarifs alignés sur les barèmes officiels, et un accompagnement en cas de non-conformité.",
  },
]

export default function APropos() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-900 to-primary-800 py-16 text-white dark:from-slate-950 dark:to-primary-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-200">À propos de Technital</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Un centre de contrôle technique au service de la sécurité routière à Libreville
          </h1>
          <p className="mt-4 max-w-2xl text-primary-100">
            Technital est un centre d'expertise et de contrôle technique automobile, agréé et opérant en convention
            avec la Mairie de Libreville pour l'inspection des véhicules de transport public et commercial.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CHIFFRES.map((c) => (
            <Card key={c.label} className="p-6 text-center">
              <p className="text-3xl font-extrabold text-primary-800 dark:text-primary-300">{c.valeur}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{c.label}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900/40 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Notre mission"
            title="Renforcer la sécurité routière, véhicule après véhicule"
            description="Le contrôle technique vérifie l'ensemble des organes de sécurité majeurs d'un véhicule — freinage, suspensions, direction, essieux, structure du châssis — ainsi que l'état des pneumatiques et la conformité des équipements de signalisation."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Un rôle institutionnel</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Dans le cadre de sa convention avec la Mairie de Libreville, Technital inspecte les véhicules de
                transport public et commercial — taxis, minibus, bus urbains et camions — qui constituent une part
                essentielle des déplacements quotidiens dans la ville.
              </p>
            </Card>
            <Card className="p-6">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Un parcours de contrôle méthodique</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Chaque visite suit trois étapes : le contrôle administratif au guichet, le passage sur bancs de test
                pour le freinage et les suspensions, puis l'inspection visuelle sur fosse. À l'issue d'un contrôle
                conforme, une attestation de visite technique est délivrée.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Nos valeurs" title="Ce qui guide notre travail au quotidien" align="center" />
        <div className="grid gap-6 sm:grid-cols-3">
          {VALEURS.map((v) => (
            <Card key={v.titre} className="p-6 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200">
                <v.icon className="h-6 w-6" />
              </span>
              <p className="mt-4 font-semibold text-slate-900 dark:text-white">{v.titre}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{v.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
          <MapPin className="h-6 w-6 text-primary-300" />
          <p className="max-w-xl text-slate-300">
            Retrouvez-nous au Boulevard de l'Indépendance, Quartier des Trois Quartiers, Libreville — à proximité de
            l'Hôtel de Ville.
          </p>
          <Button as={Link} to="/#rdv" variant="light">
            Prendre rendez-vous
          </Button>
        </div>
      </section>
    </div>
  )
}
