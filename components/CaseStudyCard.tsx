import Link from 'next/link'
import type { CaseStudy } from '@/types'
import { getMetafieldValue } from '@/types'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const summary = getMetafieldValue(caseStudy.metadata?.summary)
  const clientName = getMetafieldValue(caseStudy.metadata?.client_name)
  const industry = getMetafieldValue(caseStudy.metadata?.industry)
  const featuredImage = caseStudy.metadata?.featured_image

  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] animate-slide-up"
    >
      {/* Image */}
      {featuredImage?.imgix_url ? (
        <div className="h-52 overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={caseStudy.title}
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-52 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center">
          <span className="text-5xl">📊</span>
        </div>
      )}

      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {clientName && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
              {clientName}
            </span>
          )}
          {industry && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
              {industry}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors line-clamp-2">
          {caseStudy.title}
        </h3>

        {summary && (
          <p className="text-dark-300 text-sm leading-relaxed line-clamp-3">{summary}</p>
        )}

        <span className="inline-flex items-center gap-1 text-accent-blue text-sm font-medium mt-4 group-hover:gap-2 transition-all">
          Read case study
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}