import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getBlogPostBySlug } from '@/lib/cosmic'
import { getMetafieldValue } from '@/types'

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

  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const content = getMetafieldValue(post.metadata?.content)
  const publishedDate = getMetafieldValue(post.metadata?.published_date)
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category

  const authorName = author
    ? getMetafieldValue(author.metadata?.name) || author.title || ''
    : ''
  const authorBio = author ? getMetafieldValue(author.metadata?.bio) : ''
  const authorAvatar = author?.metadata?.avatar
  const categoryName = category
    ? getMetafieldValue(category.metadata?.name) || category.title || ''
    : ''

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
          {/* Meta */}
          <div className="mb-8">
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

            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              <span className="gradient-text">{post.title}</span>
            </h1>

            {excerpt && (
              <p className="text-dark-200 text-xl leading-relaxed">{excerpt}</p>
            )}
          </div>

          {/* Author */}
          {authorName && (
            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/5">
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
                <p className="font-semibold text-white">{authorName}</p>
                {authorBio && (
                  <p className="text-sm text-dark-300 line-clamp-1">{authorBio}</p>
                )}
              </div>
            </div>
          )}

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

          {/* Content */}
          {content && (
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-white
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-dark-100 prose-p:leading-relaxed
                prose-a:text-accent-cyan prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:text-dark-100 prose-ol:text-dark-100
                prose-li:marker:text-accent-cyan
                prose-blockquote:border-accent-purple prose-blockquote:text-dark-200
                prose-code:text-accent-cyan prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-dark-500/50 prose-pre:border prose-pre:border-white/5"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {/* Back Link */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-purple transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}