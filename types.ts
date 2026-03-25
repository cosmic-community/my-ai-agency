export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

export interface CosmicMedia {
  url: string
  imgix_url: string
}

export interface Service extends CosmicObject {
  type: 'services'
  metadata: {
    title?: string
    description?: string
    icon?: string
    featured_image?: CosmicMedia
  }
}

export interface TeamMember extends CosmicObject {
  type: 'team-members'
  metadata: {
    name?: string
    role?: string
    bio?: string
    photo?: CosmicMedia
    is_ai?: boolean | string
    specialties?: string
  }
}

export interface CaseStudy extends CosmicObject {
  type: 'case-studies'
  metadata: {
    summary?: string
    content?: string
    client_name?: string
    industry?: string
    featured_image?: CosmicMedia
    services_used?: Service[]
    team_members?: TeamMember[]
    results?: string
  }
}

export interface Testimonial extends CosmicObject {
  type: 'testimonials'
  metadata: {
    quote?: string
    client_name?: string
    client_title?: string
    company?: string
    client_photo?: CosmicMedia
    rating?: number | string
    case_study?: CaseStudy
  }
}

export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name?: string
    bio?: string
    avatar?: CosmicMedia
    team_member?: TeamMember
  }
}

export interface BlogCategory extends CosmicObject {
  type: 'blog-categories'
  metadata: {
    name?: string
    description?: string
  }
}

export interface BlogPost extends CosmicObject {
  type: 'blog-posts'
  metadata: {
    excerpt?: string
    content?: string
    featured_image?: CosmicMedia
    author?: Author
    category?: BlogCategory
    published_date?: string
  }
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export { hasStatus }
