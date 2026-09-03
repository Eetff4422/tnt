import { useState } from 'react'
import { BarChart3, Bell, Car, ClipboardCheck, LogOut } from 'lucide-react'
import PhoneFrame from './PhoneFrame.jsx'
import TabBar from './TabBar.jsx'
import LoginScreen from './LoginScreen.jsx'
import NotificationPush from './NotificationPush.jsx'
import ClientFlotteView from './ClientFlotteView.jsx'
import AgentInspectionView from './AgentInspectionView.jsx'
import MairieStatsView from './MairieStatsView.jsx'

const TABS = [
  { id: 'client', label: 'Ma Flotte', icon: Car },
  { id: 'agent', label: 'Inspection', icon: ClipboardCheck },
  { id: 'mairie', label: 'Mairie', icon: BarChart3 },
]

// Simulateur de téléphone autonome, utilisé sur l'accueil comme sur la page dédiée.
export default function MaquetteMobile() {
  const [connecte, setConnecte] = useState(false)
  const [tab, setTab] = useState('client')
  const [notification, setNotification] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
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
  )
}
