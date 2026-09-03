import { Link } from 'react-router-dom'
import { Clock, MapPin, Phone, Info } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle.jsx'
import Button from '../ui/Button.jsx'

// Section volontairement sombre dans les deux thèmes : les cartes sont stylées
// directement ici (et non via <Card>, dont le fond blanc entrerait en conflit).
const CLASSES_CARTE = 'rounded-2xl border border-slate-700 bg-slate-800/60 p-6 text-slate-100 shadow-sm'

export default function InfosPratiques() {
  return (
    <section id="contact" className="bg-slate-900 py-20 text-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Infos pratiques" title="Nous rendre visite" align="center" sombre />

        <div className="grid gap-6 sm:grid-cols-3">
          <div className={CLASSES_CARTE}>
            <Clock className="h-6 w-6 text-primary-300" />
            <p className="mt-3 font-semibold">Horaires</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>Lun – Ven : 07h30 – 15h30</li>
              <li>Samedi : 08h00 – 12h00</li>
              <li>Dimanche : Fermé</li>
            </ul>
          </div>

          <div className={CLASSES_CARTE}>
            <MapPin className="h-6 w-6 text-primary-300" />
            <p className="mt-3 font-semibold">Adresse</p>
            <p className="mt-2 text-sm text-slate-300">
              Boulevard de l'Indépendance, Quartier des Trois Quartiers, Libreville — à proximité de l'Hôtel de Ville
              et de la DGI.
            </p>
          </div>

          <div className={CLASSES_CARTE}>
            <Phone className="h-6 w-6 text-primary-300" />
            <p className="mt-3 font-semibold">Téléphone</p>
            <a href="tel:+24166856046" className="mt-2 block text-sm text-slate-300 hover:text-white">
              066 85 60 46
            </a>
          </div>
        </div>

        {/* Carte OpenStreetMap : repère approximatif du quartier des Trois Quartiers */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-700">
          <iframe
            title="Localisation du centre Technital à Libreville"
            src="https://www.openstreetmap.org/export/embed.html?bbox=9.440%2C0.383%2C9.465%2C0.402&layer=mapnik&marker=0.3925%2C9.4520"
            className="h-72 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="mt-2 text-center text-xs text-slate-400">
          <a
            href="https://www.openstreetmap.org/?mlat=0.3925&mlon=9.4520#map=16/0.3925/9.4520"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-white"
          >
            Ouvrir dans OpenStreetMap
          </a>
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-xl border border-primary-800/50 bg-primary-900/40 p-4 text-sm text-primary-100">
          <Info className="mt-0.5 h-5 w-5 shrink-0" />
          Conseil pratique : pour éviter les files d'attente aux bancs de test, présentez-vous dès l'ouverture à
          07h30 en semaine.
        </div>

        <div className="mt-8 text-center">
          <Button as={Link} to="/contact" variant="light">
            Nous écrire ou nous localiser
          </Button>
        </div>
      </div>
    </section>
  )
}
