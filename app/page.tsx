import { Card0Hero } from '@/components/sections/home/Card0Hero'
import { Card1Problem } from '@/components/sections/home/Card1Problem'
import { Card2SmartFee } from '@/components/sections/home/Card2SmartFee'
import { Card5Security } from '@/components/sections/home/Card5Security'
import { Card7HowItWorks } from '@/components/sections/home/Card7HowItWorks'
import { Card8AppPreview } from '@/components/sections/home/Card8AppPreview'
import { Card9CTA } from '@/components/sections/home/Card9CTA'

export default function HomePage() {
  return (
    <>
      <Card0Hero />
      <Card1Problem />
      <Card2SmartFee />
      <Card5Security />
      <Card7HowItWorks />
      <Card8AppPreview />
      <Card9CTA />
    </>
  )
}
