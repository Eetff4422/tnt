import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProfil } from '../data/profils.js'

const CLE_SESSION = 'technital-session'

const AuthContext = createContext(null)

// Session simulée : aucun serveur, aucune vérification de mot de passe.
// Le profil choisi est mémorisé pour survivre à un rafraîchissement de page.
export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(null)
  const [pretsAAfficher, setPretsAAfficher] = useState(false)

  // Restauration de la session au montage
  useEffect(() => {
    try {
      const idStocke = localStorage.getItem(CLE_SESSION)
      if (idStocke) setUtilisateur(getProfil(idStocke))
    } catch {
      /* stockage indisponible : on démarre déconnecté */
    }
    setPretsAAfficher(true)
  }, [])

  const valeur = useMemo(
    () => ({
      utilisateur,
      estConnecte: Boolean(utilisateur),
      pretsAAfficher,
      connecter(profilId) {
        const profil = getProfil(profilId)
        if (!profil) return null
        setUtilisateur(profil)
        try {
          localStorage.setItem(CLE_SESSION, profil.id)
        } catch {
          /* la session ne sera pas mémorisée */
        }
        return profil
      },
      deconnecter() {
        setUtilisateur(null)
        try {
          localStorage.removeItem(CLE_SESSION)
        } catch {
          /* rien à nettoyer */
        }
      },
    }),
    [utilisateur, pretsAAfficher],
  )

  return <AuthContext.Provider value={valeur}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const contexte = useContext(AuthContext)
  if (!contexte) throw new Error('useAuth doit être utilisé à l’intérieur de AuthProvider')
  return contexte
}
