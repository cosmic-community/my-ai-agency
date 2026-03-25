import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/cosmic'
import BlogPostCard from '@/components/BlogPostCard'

export const metadata: Metadata = {
  title: 'Blog | My AI Agency',
  description:
    'Insights, strategies, and stories from our human + AI team. Stay ahead with the latest in AI, engineering, and digital transformation.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="section-padding min-h-screen">
      <div className="page-container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-accent-pink font-semibold text-sm uppercase tracking-widest mb-3">
            Our Blog
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Insights & <span className="gradient-text">Ideas</span>
          </h1>
          <p className="text-dark-200 max-w-2xl mx-auto text-lg">
            Perspectives on AI strategy, modern engineering, and digital
            transformation from our human + AI team.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-dark-300 text-lg">No blog posts available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}