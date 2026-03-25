import type { Metadata } from 'next'
import { getCaseStudies } from '@/lib/cosmic'
import CaseStudyCard from '@/components/CaseStudyCard'

export const metadata: Metadata = {
  title: 'Case Studies | My AI Agency',
  description: 'Explore our successful projects and client outcomes.',
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div className="section-padding min-h-screen">
      <div className="page-container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-accent-blue font-semibold text-sm uppercase tracking-widest mb-3">
            Our Portfolio
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Case <span className="gradient-text">Studies</span>
          </h1>
          <p className="text-dark-200 max-w-2xl mx-auto text-lg">
            Real projects. Real results. See how our human + AI team has delivered
            transformative outcomes across industries.
          </p>
        </div>

        {/* Case Studies Grid */}
        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.id} caseStudy={study} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-dark-300 text-lg">No case studies available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}