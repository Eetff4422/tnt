import { useState } from 'react'
import { Car, ClipboardCheck, BarChart3, Bell, LogOut, Smartphone, Download } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle.jsx'
import Reveal from '../ui/Reveal.jsx'
import PhoneFrame from '../mobile-app/PhoneFrame.jsx'
import TabBar from '../mobile-app/TabBar.jsx'
import LoginScreen from '../mobile-app/LoginScreen.jsx'
import NotificationPush from '../mobile-app/NotificationPush.jsx'
import ClientFlotteView from '../mobile-app/ClientFlotteView.jsx'
import AgentInspectionView from '../mobile-app/AgentInspectionView.jsx'
import MairieStatsView from '../mobile-app/MairieStatsView.jsx'

const TABS = [
  { id: 'client', label: 'Ma Flotte', icon: Car },
  { id: 'agent', label: 'Inspection', icon: ClipboardCheck },
  { id: 'mairie', label: 'Mairie', icon: BarChart3 },
]

const PITCH = [
  {
    titre: 'Automobilistes',
    description: 'Suivez la validité de vos véhicules, consultez votre historique et payez en Mobile Money.',
  },
  {
    titre: 'Agents de contrôle',
    description: 'Checklist tactile sur fosse et bancs de test, anomalies photographiées et rapport instantané.',
  },
  {
    titre: 'Mairie de Libreville',
    description: 'Statistiques en direct sur la conformité des transports urbains de la commune.',
  },
]

export default function AppMobileShowcase() {
  const [connecte, setConnecte] = useState(false)
  const [tab, setTab] = useState('client')
  const [notification, setNotification] = useState(false)

  return (
    <section id="app-mobile" className="bg-gradient-to-b from-white to-slate-100 py-20 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Application mobile"
          title="Technital dans la poche de chacun"
          description="Une maquette interactive : connectez-vous, puis basculez entre les 3 profils de l'application pour découvrir l'expérience Automobiliste, Agent et Mairie."
          align="center"
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 space-y-5 lg:order-1">
            {PITCH.map((item, index) => (
              <Reveal key={item.titre} delay={index * 110}>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <p className="font-semibold text-slate-900 dark:text-white">{item.titre}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              </Reveal>
            ))}

            {/* Disponibilité à venir — boutons génériques, sans reprise des badges officiels des stores */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                <Smartphone className="h-4 w-4" /> Bientôt sur iOS
              </span>
              <span className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                <Download className="h-4 w-4" /> Bientôt sur Android
              </span>
            </div>
          </div>

          <div className="order-1 flex flex-col items-center gap-4 lg:order-2">
            {connecte ? (
              <PhoneFrame
                tabBar={<TabBar tabs={TABS} active={tab} onChange={setTab} />}
                overlay={notification ? <NotificationPush onFermer={() => setNotification(false)} /> : null}
              >
                {tab === 'client' && <ClientFlotteView />}
                {tab === 'agent' && <AgentInspectionView />}
                {tab === 'mairie' && <MairieStatsView />}
              </PhoneFrame>
            ) : (
              <PhoneFrame pleinEcran>
                <LoginScreen onConnexion={() => setConnecte(true)} />
              </PhoneFrame>
            )}

            {/* Contrôles de démonstration, hors téléphone */}
            {connecte && (
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setNotification(true)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-primary-400 hover:text-primary-700 dark:border-slate-700 dark:text-slate-300"
                >
                  <Bell className="h-3.5 w-3.5" /> Simuler une notification
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConnecte(false)
                    setNotification(false)
                    setTab('client')
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-primary-400 hover:text-primary-700 dark:border-slate-700 dark:text-slate-300"
                >
                  <LogOut className="h-3.5 w-3.5" /> Revenir à la connexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
