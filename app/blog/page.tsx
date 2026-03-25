import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/cosmic'
import BlogPostCard from '@/components/BlogPostCard'

export const metadata: Metadata = {
  title: 'Blog | My AI Agency',
  description: 'Insights on AI strategy, engineering, and client stories from our human + AI team.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="section-padding min-h-screen">
      <div className="page-container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-accent-cyan font-semibold text-sm uppercase tracking-widest mb-3">
            Our Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Insights & <span className="gradient-text">Ideas</span>
          </h1>
          <p className="text-dark-200 max-w-xl mx-auto">
            Thoughts on AI strategy, engineering deep-dives, and behind-the-scenes stories from our projects.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-dark-300">No blog posts found.</p>
        )}
      </div>
    </div>
  )
}
