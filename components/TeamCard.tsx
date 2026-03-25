import Link from 'next/link'
import type { TeamMember } from '@/types'
import { getMetafieldValue } from '@/types'

interface TeamCardProps {
  member: TeamMember
  featured?: boolean
}

export default function TeamCard({ member, featured = false }: TeamCardProps) {
  const name = getMetafieldValue(member.metadata?.name) || member.title
  const role = getMetafieldValue(member.metadata?.role)
  const photo = member.metadata?.photo
  const specialties = getMetafieldValue(member.metadata?.specialties)
  const isAi = member.metadata?.is_ai
  const isAiMember = isAi === true || isAi === 'true' || isAi === 'True'

  const specialtyList = specialties
    ? specialties
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3)
    : []

  return (
    <Link
      href={`/team/${member.slug}`}
      className={`group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] animate-slide-up ${
        featured ? 'ring-2 ring-accent-cyan/30' : ''
      }`}
    >
      {/* Photo */}
      <div className="relative h-56 overflow-hidden">
        {photo?.imgix_url ? (
          <img
            src={`${photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 flex items-center justify-center">
            <span className="text-6xl">{isAiMember ? '🤖' : '👤'}</span>
          </div>
        )}

        {/* Badge */}
        <div
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
            isAiMember
              ? 'bg-accent-purple/80 text-white'
              : 'bg-accent-cyan/80 text-white'
          }`}
        >
          {isAiMember ? '🤖 AI' : '👤 Human'}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">
          {name}
        </h3>
        {role && (
          <p className="text-accent-purple text-sm font-medium mt-1">{role}</p>
        )}

        {specialtyList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {specialtyList.map((specialty) => (
              <span
                key={specialty}
                className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-dark-200 border border-white/10"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}