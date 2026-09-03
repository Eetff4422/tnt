import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollRestoration from './components/layout/ScrollRestoration.jsx'
import RouteProtegee from './components/layout/RouteProtegee.jsx'
import { useAuth } from './context/AuthContext.jsx'

import Home from './pages/Home.jsx'
import APropos from './pages/APropos.jsx'
import NosServices from './pages/NosServices.jsx'
import Actualites from './pages/Actualites.jsx'
import ActualiteDetail from './pages/ActualiteDetail.jsx'
import VisionProduit from './pages/VisionProduit.jsx'
import Contact from './pages/Contact.jsx'
import ApplicationMobile from './pages/ApplicationMobile.jsx'
import Connexion from './pages/Connexion.jsx'
import Espace from './pages/espace/Espace.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const { estConnecte, pretsAAfficher } = useAuth()

  // On attend la restauration de la session pour éviter d'afficher brièvement
  // la vitrine à un utilisateur déjà connecté.
  if (!pretsAAfficher) return null

  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-slate-950">
      <ScrollRestoration />
      <Navbar />
      <main>
        <Routes>
          {/* L'accueil bascule sur l'espace de gestion dès qu'une session existe */}
          <Route path="/" element={estConnecte ? <Espace /> : <Home />} />
          <Route path="/vitrine" element={<Home />} />

          {/* Site vitrine */}
          <Route path="/services" element={<NosServices />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/actualites/:slug" element={<ActualiteDetail />} />
          <Route path="/vision" element={<VisionProduit />} />
          <Route path="/application-mobile" element={<ApplicationMobile />} />
          <Route path="/contact" element={<Contact />} />

          {/* Application de gestion */}
          <Route path="/connexion" element={<Connexion />} />
          <Route
            path="/espace"
            element={
              <RouteProtegee>
                <Espace />
              </RouteProtegee>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
