import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollRestoration from './components/layout/ScrollRestoration.jsx'
import Home from './pages/Home.jsx'
import APropos from './pages/APropos.jsx'
import NosServices from './pages/NosServices.jsx'
import Actualites from './pages/Actualites.jsx'
import ActualiteDetail from './pages/ActualiteDetail.jsx'
import VisionProduit from './pages/VisionProduit.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-slate-950">
      <ScrollRestoration />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/services" element={<NosServices />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/actualites/:slug" element={<ActualiteDetail />} />
          <Route path="/vision" element={<VisionProduit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
