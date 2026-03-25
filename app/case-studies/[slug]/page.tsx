// app/case-studies/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCaseStudyBySlug } from '@/lib/cosmic'
import { getMetafieldValue } from '@/types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)
  if (!study) return { title: 'Case Study Not Found' }
  return {
    title: `${study.title} | My AI Agency`,
    description: getMetafieldValue(study.metadata?.summary) || '',
  }
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)

  if (!study) notFound()

  const summary = getMetafieldValue(study.metadata?.summary)
  const content = getMetafieldValue(study.metadata?.content)
  const clientName = getMetafieldValue(study.metadata?.client_name)
  const industry = getMetafieldValue(study.metadata?.industry)
  const results = getMetafieldValue(study.metadata?.results)
  const featuredImage = study.metadata?.featured_image
  const servicesUsed = study.metadata?.services_used
  const teamMembers = study.metadata?.team_members

  return (
    <div className="section-padding min-h-screen">
      <div className="page-container">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-dark-200 hover:text-accent-cyan transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Case Studies
        </Link>

        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Title & Meta */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-3 mb-6">
              {clientName && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                  {clientName}
                </span>
              )}
              {industry && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                  {industry}
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="gradient-text">{study.title}</span>
            </h1>

            {summary && (
              <p className="text-dark-200 text-xl leading-relaxed">{summary}</p>
            )}
          </div>

          {/* Featured Image */}
          {featuredImage?.imgix_url && (
            <div className="mb-12 rounded-2xl overflow-hidden glass-card">
              <img
                src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
                alt={study.title}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Content */}
          {content && (
            <div className="mb-12">
              <div
                className="text-dark-100 leading-relaxed text-lg whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="glass-card rounded-2xl p-8 mb-12 gradient-border">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Results</h2>
              <div
                className="text-dark-100 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: results }}
              />
            </div>
          )}

          {/* Services Used */}
          {servicesUsed && Array.isArray(servicesUsed) && servicesUsed.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Services Used</h2>
              <div className="flex flex-wrap gap-3">
                {servicesUsed.map((service) => {
                  if (!service) return null
                  const serviceTitle =
                    getMetafieldValue(service.metadata?.title) || service.title || ''
                  return (
                    <Link
                      key={service.id || serviceTitle}
                      href={`/services/${service.slug || ''}`}
                      className="px-4 py-2 rounded-xl glass-card text-sm font-medium text-accent-cyan hover:border-accent-cyan/50 transition-all"
                    >
                      {serviceTitle}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Team Members */}
          {teamMembers && Array.isArray(teamMembers) && teamMembers.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Team on This Project</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {teamMembers.map((member) => {
                  if (!member) return null
                  const memberName =
                    getMetafieldValue(member.metadata?.name) || member.title || ''
                  const memberRole = getMetafieldValue(member.metadata?.role)
                  const memberPhoto = member.metadata?.photo
                  return (
                    <Link
                      key={member.id || memberName}
                      href={`/team/${member.slug || ''}`}
                      className="glass-card rounded-xl p-4 text-center hover:border-accent-purple/50 transition-all group"
                    >
                      {memberPhoto?.imgix_url ? (
                        <img
                          src={`${memberPhoto.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                          alt={memberName}
                          width={80}
                          height={80}
                          className="w-16 h-16 rounded-full mx-auto mb-3 object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-accent-purple/20 flex items-center justify-center">
                          <span className="text-2xl">🤖</span>
                        </div>
                      )}
                      <p className="text-sm font-semibold text-white truncate">{memberName}</p>
                      {memberRole && (
                        <p className="text-xs text-dark-300 truncate">{memberRole}</p>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}