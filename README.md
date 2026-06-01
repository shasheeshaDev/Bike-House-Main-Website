# Pekka

A modern Next.js + Sanity CMS website with a dynamic page builder and modular block system.

## Tech Stack

[![Next.js][next-js]][next-js-url] [![Sanity][sanity]][sanity-url] [![React][react]][react-url] [![Typescript][typescript]][typescript-url] [![Tailwind][tailwind]][tailwind-url]

## Features

- **Page Builder** - Dynamic page composition with modular blocks
- **Global Banner** - Configurable promotional banner with image and content
- **Content Blocks** - Multiple content layout variations (content-1 to content-4)
- **Card Blocks** - Flexible card components (card-1 to card-5)
- **Banner Blocks** - Hero and promotional banners (banner-1, banner-2)
- **Testimonial Slider** - Swiper-based testimonial carousel with fade effect
- **Collection Block** - Display collections with column builder content
- **Video Block** - Video embedding support
- **Form Block** - Contact forms with Resend integration
- **Map Block** - Location/map display
- **Dynamic Navigation** - Header and footer management
- **SEO Meta** - Full meta tag configuration per page
- **OG Image Generator** - Automatic Open Graph image generation
- **Type Safety** - Full TypeScript with Sanity TypeGen

## Project Structure

```
pekka/
├── frontend/                 # Next.js application
│   ├── app/                  # App router pages
│   ├── components/           # React components
│   │   ├── blocks/           # Page builder blocks
│   │   ├── global/           # Global components (header, footer, banner)
│   │   ├── shared/           # Shared/reusable components
│   │   └── ui/               # UI primitives
│   ├── sanity/               # Sanity configuration
│   │   ├── lib/              # Sanity utilities
│   │   └── queries/          # GROQ queries
│   └── style/                # Global styles
│
├── studio/                   # Sanity Studio
│   ├── schemas/              # Content schemas
│   │   ├── blocks/           # Block schemas
│   │   ├── common/           # Shared schema types
│   │   └── documents/        # Document schemas
│   └── components/           # Studio customizations
│
└── package.json              # Root workspace config
```

## Available Blocks

| Block Type | Description |
|------------|-------------|
| `banner-1` | Hero banner with background image |
| `banner-2` | Secondary banner variant |
| `card-1` to `card-5` | Various card layout options |
| `content-1` to `content-4` | Content section layouts |
| `collection-1` | Collection display with alternating layout |
| `testimonial-1` | Testimonial slider with fade effect |
| `video-1` | Video embed block |
| `form-1` | Contact form |
| `map-1` | Map/location block |

## Document Types

- **Page** - Dynamic pages with block builder
- **Collection** - Collection items with name, location, image, and content
- **Post** - Blog posts with author and categories
- **Testimonial** - Customer testimonials
- **Settings** - Global site settings
- **Header** - Navigation configuration
- **Footer** - Footer configuration

## Getting Started

See [INSTRUCTIONS.md](./INSTRUCTIONS.md) for detailed setup and development guide.

### Quick Start

```bash
# Install dependencies
pnpm install

# Start development servers (frontend + studio)
pnpm dev

# Or run separately
pnpm dev:next    # Frontend only (http://localhost:3000)
pnpm dev:studio  # Studio only (http://localhost:3333)
```

### Generate Types

```bash
pnpm typegen
```

Run this after any schema or query changes to regenerate TypeScript types.

## Environment Variables

### Frontend (`/frontend/.env.local`)

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_SITE_ENV=development
NEXT_PUBLIC_STUDIO_URL=https://studio.yoursite.com
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token

# Resend (for contact forms)
RESEND_API_KEY=your_resend_key
RESEND_TO_EMAIL=you@yoursite.com
RESEND_FROM_EMAIL=noreply@yoursite.com
```

### Studio (`/studio/.env.local`)

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## Deployment

### Frontend (Vercel)

1. Create new Vercel project
2. Set root directory to `/frontend`
3. Add environment variables
4. Deploy

### Studio (Vercel)

1. Create new Vercel project
2. Set root directory to `/studio`
3. Add environment variables
4. Deploy

### CORS Configuration

Add your domains to Sanity CORS origins:
- Frontend: `https://yoursite.com`
- Studio: `https://studio.yoursite.com`

## License

Private project.

[react-url]: https://reactjs.org/
[next-js-url]: https://nextjs.org/
[typescript-url]: https://www.typescriptlang.org/
[tailwind-url]: https://tailwindcss.com/
[sanity-url]: https://www.sanity.io/
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[next-js]: https://img.shields.io/badge/Next.js-20232A?style=for-the-badge&logo=Next.js
[typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[tailwind]: https://img.shields.io/badge/Tailwind_CSS-20232A?style=for-the-badge&logo=tailwindcss&logoColor=319795
[sanity]: https://img.shields.io/badge/Sanity-20232A?style=for-the-badge&logo=sanity&logoColor=F97316
