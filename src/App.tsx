import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FacadeStrip } from './components/FacadeStrip'
import { Legalization } from './components/Legalization'
import { WorkAreas } from './components/WorkAreas'
import { Prices } from './components/Prices'
import { Process } from './components/Process'
import { Gallery } from './components/Gallery'
import { Reviews } from './components/Reviews'
import { Contacts } from './components/Contacts'
import { Footer } from './components/Footer'
import { JsonLd } from './components/JsonLd'

export default function App() {
  return (
    <>
      <JsonLd />
      <a className="skip-link" href="#main">
        К содержанию
      </a>
      <Header />
      <main id="main">
        <Hero />
        <FacadeStrip />
        <Legalization />
        <WorkAreas />
        <Prices />
        <Process />
        <Gallery />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}

