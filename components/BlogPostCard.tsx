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

  const authorName = author ? getMetafieldValue(author.metadata?.name) || author.title : ''
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
    <Link
      href={`/blog/${post.slug}`}
      className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] animate-slide-up"
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
        <div className="h-52 bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 flex items-center justify-center">
          <span className="text-5xl">📝</span>
        </div>
      )}

      <div className="p-6">
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
          <p className="text-dark-300 text-sm leading-relaxed line-clamp-3 mb-4">
            {excerpt}
          </p>
        )}

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          {authorAvatar?.imgix_url ? (
            <img
              src={`${authorAvatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
              alt={authorName}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center">
              <span className="text-sm">✍️</span>
            </div>
          )}
          <span className="text-sm text-dark-200">{authorName}</span>
        </div>
      </div>
    </Link>
  )
}
