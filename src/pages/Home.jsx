import HeroSection from '../components/site/HeroSection.jsx'
import PartenairesBand from '../components/site/PartenairesBand.jsx'
import ChiffresCles from '../components/site/ChiffresCles.jsx'
import SimulateurVisite from '../components/site/SimulateurVisite.jsx'
import PriseRdv from '../components/site/PriseRdv.jsx'
import VerificateurAttestation from '../components/site/VerificateurAttestation.jsx'
import AppMobileShowcase from '../components/site/AppMobileShowcase.jsx'
import Temoignages from '../components/site/Temoignages.jsx'
import Faq from '../components/site/Faq.jsx'
import InfosPratiques from '../components/site/InfosPratiques.jsx'

// Le formulaire de contact vit sur la page Contact ; l'accueil conserve la prise
// de rendez-vous, qui reste le parcours principal du site vitrine.
export default function Home() {
  return (
    <>
      <HeroSection />
      <PartenairesBand />
      <ChiffresCles />
      <SimulateurVisite />
      <PriseRdv />
      <VerificateurAttestation />
      <AppMobileShowcase />
      <Temoignages />
      <Faq />
      <InfosPratiques />
    </>
  )
}
