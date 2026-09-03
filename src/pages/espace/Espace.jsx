import { useAuth } from '../../context/AuthContext.jsx'
import EspaceAutomobiliste from './EspaceAutomobiliste.jsx'
import EspaceAgent from './EspaceAgent.jsx'
import EspaceMairie from './EspaceMairie.jsx'

// Aiguillage vers l'interface correspondant au profil connecté.
const INTERFACES = {
  automobiliste: EspaceAutomobiliste,
  agent: EspaceAgent,
  mairie: EspaceMairie,
}

export default function Espace() {
  const { utilisateur } = useAuth()
  const Interface = INTERFACES[utilisateur?.id] ?? EspaceAutomobiliste
  return <Interface />
}
