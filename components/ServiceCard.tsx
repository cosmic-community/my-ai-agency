import Link from 'next/link'
import type { Service } from '@/types'
import { getMetafieldValue } from '@/types'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const title = getMetafieldValue(service.metadata?.title) || service.title
  const description = getMetafieldValue(service.metadata?.description)
  const icon = getMetafieldValue(service.metadata?.icon)
  const featuredImage = service.metadata?.featured_image

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] animate-slide-up"
    >
      {/* Image */}
      {featuredImage?.imgix_url ? (
        <div className="h-48 overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={200}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 flex items-center justify-center">
          <span className="text-5xl">{icon || '⚡'}</span>
        </div>
      )}

      <div className="p-6">
        {icon && !featuredImage?.imgix_url && null}
        {icon && featuredImage?.imgix_url && (
          <span className="text-2xl mb-3 block">{icon}</span>
        )}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-dark-300 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        )}
        <span className="inline-flex items-center gap-1 text-accent-cyan text-sm font-medium mt-4 group-hover:gap-2 transition-all">
          Learn more
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}