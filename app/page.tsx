import Link from 'next/link'
import { getServices, getTeamMembers, getCaseStudies, getTestimonials } from '@/lib/cosmic'
import { getMetafieldValue } from '@/types'
import ServiceCard from '@/components/ServiceCard'
import TeamCard from '@/components/TeamCard'
import CaseStudyCard from '@/components/CaseStudyCard'
import TestimonialCard from '@/components/TestimonialCard'

export default async function HomePage() {
  const [services, teamMembers, caseStudies, testimonials] = await Promise.all([
    getServices(),
    getTeamMembers(),
    getCaseStudies(),
    getTestimonials(),
  ])

  const aiCount = teamMembers.filter((m) => {
    const isAi = m.metadata?.is_ai
    return isAi === true || isAi === 'true' || isAi === 'True'
  }).length

  const humanCount = teamMembers.length - aiCount

  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-cyan/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-3xl" />

        <div className="page-container relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-accent-cyan mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              {humanCount} Human + {aiCount} AI Team Members
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
              The Future of
              <br />
              <span className="gradient-text">Digital Agency</span>
              <br />
              is Here
            </h1>

            <p className="text-lg sm:text-xl text-dark-200 max-w-2xl mx-auto mb-10 leading-relaxed">
              We are an AI-powered agency that handles digital projects for
              clients across all industries. Combining human creativity with AI
              efficiency to deliver exceptional results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-hero-gradient text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-accent-cyan/25"
              >
                View Our Work
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl glass-card text-white font-semibold text-lg hover:border-accent-cyan/50 transition-all"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="section-padding">
        <div className="page-container">
          <div className="text-center mb-16">
            <p className="text-accent-cyan font-semibold text-sm uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-dark-200 max-w-xl mx-auto">
              AI-powered solutions tailored to every industry and every challenge.
            </p>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <p className="text-center text-dark-300">No services found.</p>
          )}

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="text-accent-cyan hover:text-accent-purple transition-colors font-medium inline-flex items-center gap-2"
            >
              View all services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Team Section ── */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent" />
        <div className="page-container relative z-10">
          <div className="text-center mb-16">
            <p className="text-accent-purple font-semibold text-sm uppercase tracking-widest mb-3">
              Who We Are
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-dark-200 max-w-xl mx-auto">
              {humanCount} human visionary leading {aiCount} AI specialists — a team built for the future.
            </p>
          </div>

          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.slice(0, 8).map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <p className="text-center text-dark-300">No team members found.</p>
          )}

          <div className="text-center mt-12">
            <Link
              href="/team"
              className="text-accent-purple hover:text-accent-cyan transition-colors font-medium inline-flex items-center gap-2"
            >
              View all team members
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Case Studies Section ── */}
      <section className="section-padding">
        <div className="page-container">
          <div className="text-center mb-16">
            <p className="text-accent-blue font-semibold text-sm uppercase tracking-widest mb-3">
              Our Work
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Case <span className="gradient-text">Studies</span>
            </h2>
            <p className="text-dark-200 max-w-xl mx-auto">
              Real results for real clients across every industry.
            </p>
          </div>

          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.slice(0, 6).map((study) => (
                <CaseStudyCard key={study.id} caseStudy={study} />
              ))}
            </div>
          ) : (
            <p className="text-center text-dark-300">No case studies found.</p>
          )}

          <div className="text-center mt-12">
            <Link
              href="/case-studies"
              className="text-accent-blue hover:text-accent-cyan transition-colors font-medium inline-flex items-center gap-2"
            >
              View all case studies
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/5 to-transparent" />
        <div className="page-container relative z-10">
          <div className="text-center mb-16">
            <p className="text-accent-pink font-semibold text-sm uppercase tracking-widest mb-3">
              Client Love
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              What Clients <span className="gradient-text">Say</span>
            </h2>
            <p className="text-dark-200 max-w-xl mx-auto">
              Don&apos;t take our word for it — hear from the people we&apos;ve
              worked with.
            </p>
          </div>

          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 6).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <p className="text-center text-dark-300">No testimonials found.</p>
          )}

          <div className="text-center mt-12">
            <Link
              href="/testimonials"
              className="text-accent-pink hover:text-accent-cyan transition-colors font-medium inline-flex items-center gap-2"
            >
              View all testimonials
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="section-padding">
        <div className="page-container">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-hero-gradient opacity-90" />
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>
            <div className="relative z-10 py-20 px-8 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
                Let our AI-powered team take your digital projects to the next
                level. Fast, intelligent, and always on.
              </p>
              <Link
                href="/case-studies"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-dark-500 font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Started Today
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}