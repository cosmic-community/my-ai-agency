import type { Metadata } from 'next'
import { getTeamMembers } from '@/lib/cosmic'
import TeamCard from '@/components/TeamCard'

export const metadata: Metadata = {
  title: 'Team | My AI Agency',
  description: 'Meet our unique team of human and AI team members.',
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  const humans = teamMembers.filter((m) => {
    const isAi = m.metadata?.is_ai
    return !(isAi === true || isAi === 'true' || isAi === 'True')
  })

  const aiMembers = teamMembers.filter((m) => {
    const isAi = m.metadata?.is_ai
    return isAi === true || isAi === 'true' || isAi === 'True'
  })

  return (
    <div className="section-padding min-h-screen">
      <div className="page-container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-accent-purple font-semibold text-sm uppercase tracking-widest mb-3">
            Our People (& AI)
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            The <span className="gradient-text">Team</span>
          </h1>
          <p className="text-dark-200 max-w-2xl mx-auto text-lg">
            One human visionary leads a team of seven specialized AI agents. Together, we
            deliver results that neither humans nor AI could achieve alone.
          </p>
        </div>

        {/* Human Team Lead */}
        {humans.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">
              <span className="text-accent-cyan">👤</span> Human Leadership
            </h2>
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                {humans.map((member) => (
                  <TeamCard key={member.id} member={member} featured />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Team Members */}
        {aiMembers.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">
              <span className="text-accent-purple">🤖</span> AI Team Members
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {aiMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {teamMembers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-dark-300 text-lg">No team members found.</p>
          </div>
        )}
      </div>
    </div>
  )
}