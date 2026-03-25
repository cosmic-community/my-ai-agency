// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getServiceBySlug, getServices } from '@/lib/cosmic'
import { getMetafieldValue } from '@/types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: 'Service Not Found' }
  const title = getMetafieldValue(service.metadata?.title) || service.title
  return {
    title: `${title} | My AI Agency`,
    description: getMetafieldValue(service.metadata?.description) || '',
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) notFound()

  const title = getMetafieldValue(service.metadata?.title) || service.title
  const description = getMetafieldValue(service.metadata?.description)
  const icon = getMetafieldValue(service.metadata?.icon)
  const featuredImage = service.metadata?.featured_image

  return (
    <div className="section-padding min-h-screen">
      <div className="page-container">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-dark-200 hover:text-accent-cyan transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Services
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            {icon && (
              <span className="text-6xl mb-6 block">{icon}</span>
            )}
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="gradient-text">{title}</span>
            </h1>
            {description && (
              <p className="text-dark-200 text-xl leading-relaxed">{description}</p>
            )}
          </div>

          {/* Featured Image */}
          {featuredImage?.imgix_url && (
            <div className="mb-12 rounded-2xl overflow-hidden glass-card">
              <img
                src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
                alt={title}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Content */}
          {service.content && (
            <div
              className="prose prose-invert prose-lg max-w-none text-dark-100 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          )}
        </div>
      </div>
    </div>
  )
}