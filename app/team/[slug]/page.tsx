// app/team/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTeamMemberBySlug } from '@/lib/cosmic'
import { getMetafieldValue } from '@/types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const member = await getTeamMemberBySlug(slug)
  if (!member) return { title: 'Team Member Not Found' }
  const name = getMetafieldValue(member.metadata?.name) || member.title
  const role = getMetafieldValue(member.metadata?.role)
  return {
    title: `${name} — ${role} | My AI Agency`,
    description: getMetafieldValue(member.metadata?.bio) || '',
  }
}

export default async function TeamMemberDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const member = await getTeamMemberBySlug(slug)

  if (!member) notFound()

  const name = getMetafieldValue(member.metadata?.name) || member.title
  const role = getMetafieldValue(member.metadata?.role)
  const bio = getMetafieldValue(member.metadata?.bio)
  const photo = member.metadata?.photo
  const specialties = getMetafieldValue(member.metadata?.specialties)
  const isAi = member.metadata?.is_ai
  const isAiMember = isAi === true || isAi === 'true' || isAi === 'True'

  const specialtyList = specialties
    ? specialties.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  return (
    <div className="section-padding min-h-screen">
      <div className="page-container">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 text-dark-200 hover:text-accent-cyan transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Team
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden animate-fade-in">
            <div className="md:flex">
              {/* Photo */}
              <div className="md:w-1/3 relative">
                {photo?.imgix_url ? (
                  <img
                    src={`${photo.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                    alt={name}
                    width={400}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-64 md:h-full bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center">
                    <span className="text-7xl">{isAiMember ? '🤖' : '👤'}</span>
                  </div>
                )}
                {/* AI / Human Badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    isAiMember
                      ? 'bg-accent-purple/90 text-white'
                      : 'bg-accent-cyan/90 text-white'
                  }`}
                >
                  {isAiMember ? '🤖 AI' : '👤 Human'}
                </div>
              </div>

              {/* Info */}
              <div className="md:w-2/3 p-8 md:p-12">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  <span className="gradient-text">{name}</span>
                </h1>
                {role && (
                  <p className="text-accent-cyan text-lg font-medium mb-6">{role}</p>
                )}

                {bio && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-widest mb-3">
                      About
                    </h3>
                    <p className="text-dark-100 leading-relaxed whitespace-pre-line">{bio}</p>
                  </div>
                )}

                {specialtyList.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-widest mb-3">
                      Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {specialtyList.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 rounded-full text-sm bg-accent-purple/10 text-accent-purple border border-accent-purple/20"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}