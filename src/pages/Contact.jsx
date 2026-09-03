import { Clock, Facebook, Info, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import ContactForm from '../components/site/ContactForm.jsx'
import PriseRdv from '../components/site/PriseRdv.jsx'

// Canaux non encore ouverts par Technital : présentés comme emplacements réservés,
// volontairement non cliquables tant que les adresses réelles ne sont pas fournies.
const CANAUX_A_VENIR = [
  { icone: Mail, libelle: 'Adresse e-mail', mention: 'à communiquer' },
  { icone: Facebook, libelle: 'Page Facebook', mention: 'à créer' },
  { icone: MessageCircle, libelle: 'WhatsApp Business', mention: 'à confirmer' },
]

export default function Contact() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-900 to-primary-800 py-16 text-white dark:from-slate-950 dark:to-primary-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-200">Contact</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">Nous joindre et prendre rendez-vous</h1>
          <p className="mt-4 max-w-2xl text-primary-100">
            Le centre vous accueille aux Trois Quartiers, du lundi au samedi matin.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200">
              <Phone className="h-5 w-5" />
            </span>
            <p className="mt-4 font-semibold text-slate-900 dark:text-white">Téléphone</p>
            <a
              href="tel:+24166856046"
              className="mt-1 block text-sm text-primary-700 hover:underline dark:text-primary-300"
            >
              066 85 60 46
            </a>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Aux heures d'ouverture du centre.
            </p>
          </Card>

          <Card className="p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200">
              <MapPin className="h-5 w-5" />
            </span>
            <p className="mt-4 font-semibold text-slate-900 dark:text-white">Adresse</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Boulevard de l'Indépendance, Quartier des Trois Quartiers, Libreville — à proximité de l'Hôtel de Ville
              et de la Direction Générale des Impôts.
            </p>
          </Card>

          <Card className="p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200">
              <Clock className="h-5 w-5" />
            </span>
            <p className="mt-4 font-semibold text-slate-900 dark:text-white">Horaires</p>
            <ul className="mt-1 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Lundi – Vendredi : 07h30 – 15h30</li>
              <li>Samedi : 08h00 – 12h00</li>
              <li>Dimanche : fermé</li>
            </ul>
          </Card>
        </div>

        {/* Carte OpenStreetMap : repère approximatif du quartier des Trois Quartiers */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <iframe
            title="Localisation du centre Technital à Libreville"
            src="https://www.openstreetmap.org/export/embed.html?bbox=9.440%2C0.383%2C9.465%2C0.402&layer=mapnik&marker=0.3925%2C9.4520"
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
          <a
            href="https://www.openstreetmap.org/?mlat=0.3925&mlon=9.4520#map=16/0.3925/9.4520"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary-700 dark:hover:text-primary-300"
          >
            Ouvrir dans OpenStreetMap
          </a>
        </p>

        {/* Canaux en ligne à ouvrir */}
        <div className="mt-12">
          <SectionTitle
            eyebrow="Canaux en ligne"
            title="Bientôt joignables autrement"
            description="Technital ne dispose pas encore d'adresse e-mail publique ni de présence sur les réseaux sociaux. Ces emplacements sont prêts à recevoir les coordonnées dès qu'elles existeront."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {CANAUX_A_VENIR.map((canal) => (
              <div
                key={canal.libelle}
                className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/60"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-400 dark:bg-slate-800">
                  <canal.icone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-slate-700 dark:text-slate-200">{canal.libelle}</span>
                  <span className="block text-xs italic text-slate-400 dark:text-slate-500">{canal.mention}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-xl border border-primary-200 bg-primary-50 p-4 text-xs text-primary-900 dark:border-primary-900 dark:bg-primary-950 dark:text-primary-100">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            En attendant, le téléphone et le formulaire ci-dessous restent les moyens de contact à utiliser.
          </div>
        </div>
      </section>

      <ContactForm />
      <PriseRdv />
    </div>
  )
}
