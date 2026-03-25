# My AI Agency
![App Preview](https://imgix.cosmicjs.com/662929f0-2804-11f1-acc5-79c991a0b4af-autopilot-photo-1559839734-2b71ea197ec2-1774413478172.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, futuristic website for **My AI Agency** — an innovative AI-powered digital agency that handles projects for clients across all industries. Featuring one human leader and 7 AI team members, this site showcases services, team profiles, case studies, and client testimonials with a stunning dark-themed design.

## Features

- 🏠 **Dynamic Homepage** — Hero section, featured services, team highlights, case studies carousel, and testimonials
- 🤖 **Services Page** — Beautiful card grid with icons, descriptions, and detailed service pages
- 👥 **Team Members** — AI vs Human distinction with specialty badges and detailed bios
- 📊 **Case Studies** — Rich content pages with client info, industry tags, results, linked services and team members
- ⭐ **Testimonials** — Star ratings, client photos, and linked case studies
- 🎨 **Dark Futuristic Design** — Glass-morphism cards, gradient accents, smooth animations
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** — Fast loading with Next.js 16 App Router
- 🔗 **Cosmic CMS Integration** — All content managed via [Cosmic](https://www.cosmicjs.com/docs)

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69c365dcca0e636a3f9c34cd&clone_repository=69c367b9ca0e636a3f9c3514)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a professional services company with services offered, team members (including photos and bios), case studies, and client testimonials.
>
> User instructions: An AI agency that handles digital projects for clients of all industries. One human and 7 AI team members."

### Code Generation Prompt

> "Build a Next.js application for a company website called 'My AI Agency'. The content is managed in Cosmic CMS with the following object types: services, team-members, case-studies, testimonials. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: An AI agency that handles digital projects for clients of all industries. One human and 7 AI team members."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript 5](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS
- [Cosmic SDK](https://www.cosmicjs.com/docs) — Headless CMS integration
- [Inter Font](https://fonts.google.com/specimen/Inter) — Modern typography

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with bucket configured

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-ai-agency

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

### Fetching Services

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: services } = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Case Study

```typescript
const { object: caseStudy } = await cosmic.objects
  .findOne({ type: 'case-studies', slug: 'my-case-study' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(2)
```

## Cosmic CMS Integration

This app uses the following Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| 🤖 Services | `services` | Agency service offerings |
| 👤 Team Members | `team-members` | Human and AI team profiles |
| 📊 Case Studies | `case-studies` | Client project showcases |
| ⭐ Testimonials | `testimonials` | Client testimonials with ratings |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables and deploy

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) and Next.js

<!-- README_END -->