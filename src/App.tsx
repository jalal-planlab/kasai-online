import { useCallback, useState } from 'react'
import { AnimalPackages } from './components/AnimalPackages'
import { BookingForm } from './components/BookingForm'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Navbar } from './components/Navbar'
import { SuccessModal } from './components/SuccessModal'
import { TrustSection } from './components/TrustSection'
import type { AnimalType } from './lib/constants'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [reference, setReference] = useState('')

  const goToBook = useCallback(() => scrollTo('book'), [])
  const goToPackages = useCallback(() => scrollTo('packages'), [])

  const handleSelectAnimal = useCallback((animal: AnimalType) => {
    setSelectedAnimal(animal)
    scrollTo('book')
  }, [])

  const handleSubmitSuccess = useCallback((ref: string) => {
    setReference(ref)
    setModalOpen(true)
  }, [])

  return (
    <>
      <Navbar onBookClick={goToBook} />
      <main>
        <Hero onBookClick={goToBook} onPackagesClick={goToPackages} />
        <HowItWorks />
        <AnimalPackages onSelectAnimal={handleSelectAnimal} />
        <TrustSection />
        <BookingForm
          selectedAnimal={selectedAnimal}
          onSubmitSuccess={handleSubmitSuccess}
        />
      </main>
      <Footer />
      <SuccessModal
        open={modalOpen}
        reference={reference}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
