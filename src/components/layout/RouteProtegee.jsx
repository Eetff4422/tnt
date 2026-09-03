import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

// Réserve une route aux profils connectés. On attend la restauration de la session
// pour éviter une redirection parasite au premier rendu après un rafraîchissement.
export default function RouteProtegee({ children }) {
  const { estConnecte, pretsAAfficher } = useAuth()

  if (!pretsAAfficher) return null
  if (!estConnecte) return <Navigate to="/connexion" replace />

  return children
}
