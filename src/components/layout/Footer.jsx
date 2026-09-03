import { MapPin, Phone } from 'lucide-react'
import Logo from '../ui/Logo.jsx'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5 text-white">
            <Logo className="h-9 w-9" ton="clair" />
            <span className="text-lg font-bold">Technital Libreville</span>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Centre de contrôle technique automobile, en convention avec la Mairie de Libreville pour le renforcement de
            la sécurité routière.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Horaires</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li className="flex justify-between gap-4">
              <span>Lundi – Vendredi</span>
              <span>07h30 – 15h30</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Samedi</span>
              <span>08h00 – 12h00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Dimanche</span>
              <span>Fermé</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
              Boulevard de l'Indépendance, Trois Quartiers, Libreville — à proximité de l'Hôtel de Ville
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary-400" />
              <a href="tel:+24166856046" className="hover:text-white">
                066 85 60 46
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Technital Libreville — Prototype de démonstration.
      </div>
    </footer>
  )
}
