import Link from 'next/link'
import type { Testimonial } from '@/types'
import { getMetafieldValue } from '@/types'
import StarRating from '@/components/StarRating'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const quote = getMetafieldValue(testimonial.metadata?.quote)
  const clientName = getMetafieldValue(testimonial.metadata?.client_name)
  const clientTitle = getMetafieldValue(testimonial.metadata?.client_title)
  const company = getMetafieldValue(testimonial.metadata?.company)
  const clientPhoto = testimonial.metadata?.client_photo
  const ratingRaw = testimonial.metadata?.rating
  const caseStudy = testimonial.metadata?.case_study

  let rating = 5
  if (typeof ratingRaw === 'number') {
    rating = ratingRaw
  } else if (typeof ratingRaw === 'string') {
    const parsed = parseInt(ratingRaw, 10)
    if (!isNaN(parsed)) {
      rating = parsed
    }
  }

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col transition-all duration-300 hover:border-accent-pink/30 animate-slide-up">
      {/* Quote */}
      <div className="flex-1 mb-6">
        <svg
          className="w-8 h-8 text-accent-pink/40 mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        {quote && (
          <p className="text-dark-100 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
        )}
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={rating} />
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        {clientPhoto?.imgix_url ? (
          <img
            src={`${clientPhoto.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
            alt={clientName || 'Client'}
            width={44}
            height={44}
            className="w-11 h-11 rounded-full object-cover border-2 border-accent-pink/30"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-accent-pink/20 flex items-center justify-center text-lg">
            {clientName ? clientName.charAt(0) : '?'}
          </div>
        )}
        <div>
          {clientName && (
            <p className="text-white font-semibold text-sm">{clientName}</p>
          )}
          {(clientTitle || company) && (
            <p className="text-dark-300 text-xs">
              {clientTitle}
              {clientTitle && company ? ' · ' : ''}
              {company}
            </p>
          )}
        </div>
      </div>

      {/* Linked Case Study */}
      {caseStudy && caseStudy.slug && (
        <Link
          href={`/case-studies/${caseStudy.slug}`}
          className="mt-4 pt-4 border-t border-white/5 text-xs text-accent-blue hover:text-accent-cyan transition-colors inline-flex items-center gap-1"
        >
          View case study
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}