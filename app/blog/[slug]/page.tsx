import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getBlogPostBySlug } from '@/lib/cosmic'
import { getMetafieldValue } from '@/types'
import Markdown from '@/components/Markdown'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} | My AI Agency Blog`,
    description: getMetafieldValue(post.metadata?.excerpt) || '',
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) notFound()

  const content = getMetafieldValue(post.metadata?.content)
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const publishedDate = getMetafieldValue(post.metadata?.published_date)
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category

  const authorName = author ? getMetafieldValue(author.metadata?.name) || author.title : ''
  const authorBio = author ? getMetafieldValue(author.metadata?.bio) : ''
  const authorAvatar = author?.metadata?.avatar
  const categoryName = category ? getMetafieldValue(category.metadata?.name) || category.title : ''

  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <div className="section-padding min-h-screen">
      <div className="page-container">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-dark-200 hover:text-accent-cyan transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <article className="max-w-3xl mx-auto animate-fade-in">
          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {categoryName && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                  {categoryName}
                </span>
              )}
              {formattedDate && (
                <span className="text-sm text-dark-300">{formattedDate}</span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="gradient-text">{post.title}</span>
            </h1>

            {excerpt && (
              <p className="text-dark-200 text-xl leading-relaxed">{excerpt}</p>
            )}

            {/* Author */}
            {authorName && (
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                {authorAvatar?.imgix_url ? (
                  <img
                    src={`${authorAvatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                    alt={authorName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                    <span className="text-xl">✍️</span>
                  </div>
                )}
                <div>
                  <p className="text-white font-semibold">{authorName}</p>
                  {authorBio && (
                    <p className="text-dark-300 text-sm line-clamp-1">{authorBio}</p>
                  )}
                </div>
              </div>
            )}
          </header>

          {/* Featured Image */}
          {featuredImage?.imgix_url && (
            <div className="mb-12 rounded-2xl overflow-hidden glass-card">
              <img
                src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Content — rendered as markdown */}
          {content && (
            <Markdown content={content} />
          )}
        </article>
      </div>
    </div>
  )
}
