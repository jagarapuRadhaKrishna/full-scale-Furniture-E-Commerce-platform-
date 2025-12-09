import HeroSlider from '@/components/home/HeroSlider'
import CollectionsShowcase from '@/components/home/CollectionsShowcase'
import AboutUsSection from '@/components/home/AboutUsSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import TestimonialsSection from '@/components/home/TestimonialsSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8]">
      <HeroSlider />
      <CollectionsShowcase />
      <AboutUsSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <TestimonialsSection />
    </div>
  )
}