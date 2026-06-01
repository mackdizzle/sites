import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import FeaturedCollection from '@/components/home/FeaturedCollection'
import BestSellers from '@/components/home/BestSellers'
import BrandStory from '@/components/home/BrandStory'
import LimitedDrop from '@/components/home/LimitedDrop'
import MembershipCTA from '@/components/home/MembershipCTA'
import Testimonials from '@/components/home/Testimonials'
import NewsletterSignup from '@/components/home/NewsletterSignup'
import ScriptureMarquee from '@/components/home/ScriptureMarquee'

export const metadata: Metadata = {
  title: 'Rare Script — Faith Worn Rare | Luxury Christian Fashion',
  description:
    'Premium faith-based apparel crafted for those who walk with purpose. Discover luxury Christian leisurewear, jackets, tees, and limited drops.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScriptureMarquee />
      <FeaturedCollection />
      <BestSellers
        title="Best Sellers"
        subtitle="The pieces our community reaches for again and again."
        filter="bestsellers"
      />
      <BrandStory />
      <BestSellers
        title="New Arrivals"
        subtitle="Fresh from the studio. Crafted with intention."
        filter="new"
        limit={4}
      />
      <LimitedDrop />
      <MembershipCTA />
      <Testimonials />
      <NewsletterSignup />
    </>
  )
}
