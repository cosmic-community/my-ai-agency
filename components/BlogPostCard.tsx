import Link from 'next/link'
import type { BlogPost } from '@/types'
import { getMetafieldValue } from '@/types'

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const publishedDate = getMetafieldValue(post.metadata?.published_date)
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category

  const authorName = author
    ? getMetafieldValue(author.metadata?.name) || author.title || ''
    : ''
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
    <Link
      href={`/blog/${post.slug}`}
      className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] animate-slide-up flex flex-col"
    >
      {/* Image */}
      {featuredImage?.imgix_url ? (
        <div className="h-52 overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-52 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center">
          <span className="text-5xl">📝</span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Category & Date */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {categoryName && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
              {categoryName}
            </span>
          )}
          {formattedDate && (
            <span className="text-xs text-dark-300">{formattedDate}</span>
          )}
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors line-clamp-2">
          {post.title}
        </h3>

        {excerpt && (
          <p className="text-dark-300 text-sm leading-relaxed line-clamp-3 flex-1">
            {excerpt}
          </p>
        )}

        {/* Author & Read More */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          {authorName && (
            <div className="flex items-center gap-2">
              {authorAvatar?.imgix_url ? (
                <img
                  src={`${authorAvatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={authorName}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                  <span className="text-xs">✍️</span>
                </div>
              )}
              <span className="text-xs text-dark-200">{authorName}</span>
            </div>
          )}
          <span className="inline-flex items-center gap-1 text-accent-blue text-sm font-medium group-hover:gap-2 transition-all">
            Read
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}