import type { Metadata } from 'next'
import { getTestimonials } from '@/lib/cosmic'
import TestimonialCard from '@/components/TestimonialCard'

export const metadata: Metadata = {
  title: 'Testimonials | My AI Agency',
  description: 'Hear what our clients say about working with our AI-powered team.',
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="section-padding min-h-screen">
      <div className="page-container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-accent-pink font-semibold text-sm uppercase tracking-widest mb-3">
            Client Feedback
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Client <span className="gradient-text">Testimonials</span>
          </h1>
          <p className="text-dark-200 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it — here&apos;s what our clients
            have to say about working with our AI-powered team.
          </p>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-dark-300 text-lg">No testimonials available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}