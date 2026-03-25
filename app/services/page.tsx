import type { Metadata } from 'next'
import { getServices } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'Services | My AI Agency',
  description: 'Explore our AI-powered digital services for every industry.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="section-padding min-h-screen">
      <div className="page-container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-accent-cyan font-semibold text-sm uppercase tracking-widest mb-3">
            What We Offer
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-dark-200 max-w-2xl mx-auto text-lg">
            From strategy to execution, our AI-powered team delivers
            comprehensive digital solutions tailored to your industry.
          </p>
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-dark-300 text-lg">No services available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}