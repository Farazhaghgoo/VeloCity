import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import SecurityStrip from '@/components/SecurityStrip'
import Problem from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import FeatureBento from '@/components/FeatureBento'
import Benefits from '@/components/Benefits'
import Trust from '@/components/Trust'
import SocialProof from '@/components/SocialProof'
import Engine from '@/components/Engine'
import DataRoom from '@/components/DataRoom'
import Pricing from '@/components/Pricing'
import SecretSauce from '@/components/SecretSauce'
import FAQ from '@/components/FAQ'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <SecurityStrip />
        <Problem />
        <HowItWorks />
        <FeatureBento />
        <Benefits />
        <Trust />
        <SocialProof />
        <Engine />
        <DataRoom />
        <Pricing />
        <SecretSauce />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
