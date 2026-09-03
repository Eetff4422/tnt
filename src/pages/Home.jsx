import HeroSection from '../components/site/HeroSection.jsx'
import PartenairesBand from '../components/site/PartenairesBand.jsx'
import ChiffresCles from '../components/site/ChiffresCles.jsx'
import SimulateurVisite from '../components/site/SimulateurVisite.jsx'
import PriseRdv from '../components/site/PriseRdv.jsx'
import VerificateurAttestation from '../components/site/VerificateurAttestation.jsx'
import AppMobileShowcase from '../components/site/AppMobileShowcase.jsx'
import Temoignages from '../components/site/Temoignages.jsx'
import Faq from '../components/site/Faq.jsx'
import ContactForm from '../components/site/ContactForm.jsx'
import InfosPratiques from '../components/site/InfosPratiques.jsx'

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
      <ContactForm />
      <InfosPratiques />
    </>
  )
}
