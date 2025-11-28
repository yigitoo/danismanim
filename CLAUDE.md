# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Danışmanım is an educational consultancy website for danismanim.co domain. This is a production-ready Next.js application built with TypeScript, MongoDB, and Tailwind CSS, providing both public-facing pages and an admin CMS for blog management.

## Development Commands

### Essential Commands
```bash
# Development
bun dev                  # Start development server at localhost:3000
bun run build            # Build for production
bun start                # Start production server

# Linting
bun run lint             # Run ESLint

# Admin Setup
bun run create-admin     # Create admin user (email: admin@danismanim.co, password: admin123)
```

### Environment Setup
Required environment variable in `.env` or `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/danismanim
# Or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/danismanim
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router) with React 19
- **Runtime**: Bun (primary) or Node.js
- **Language**: TypeScript with strict mode
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS 4 with custom CSS variables
- **Animations**: Framer Motion for smooth transitions
- **Authentication**: bcryptjs for password hashing (simple session-based auth)
- **Icons**: React Icons (Feather set) and Lucide React

### Key Architectural Patterns

1. **Database Connection**: Global singleton pattern with connection caching in `lib/mongodb.ts` to prevent connection exhaustion in serverless environments. Always use `connectDB()` before database operations in API routes.

2. **Mongoose Models**: Models use the pattern `mongoose.models.ModelName || mongoose.model(...)` to prevent recompilation during development hot reloads.

3. **API Routes**: Located in `app/api/`, all routes should:
   - Import and call `connectDB()` before any database operation
   - Use try-catch for error handling
   - Return `NextResponse.json()` for responses

4. **Component Structure**:
   - Reusable components in `/components` directory
   - Page-specific components inline in route files
   - All components use TypeScript with proper prop typing from `/types/index.ts`

5. **Styling Pattern**:
   - Custom CSS variables defined in `app/globals.css` under `:root` and `@theme`
   - Utility classes (`.glass`, `.btn-primary`, `.card`, etc.) in globals.css
   - Component-specific styles use Tailwind classes
   - Color scheme: Teal primary (#0D9488), Amber secondary (#F59E0B), Indigo accent (#6366F1)

### File Structure
```
app/
├── page.tsx                    # Landing page (hero, values, partners, mission, contact)
├── about/                      # About page with team profiles
├── contact/                    # Contact page with form
├── blog/                       # Blog listing and individual posts
├── admin/                      # Protected admin panel
│   ├── login/                  # Admin authentication
│   ├── dashboard/              # Blog post management
│   └── posts/[id]/            # Post editor (create/edit)
└── api/
    ├── auth/login/            # POST - Admin login endpoint
    └── posts/                 # CRUD endpoints for blog posts
        ├── route.ts           # GET (list), POST (create)
        ├── [id]/route.ts      # GET, PUT, DELETE (single post)
        └── slug/[slug]/       # GET post by slug

components/
├── Navbar.tsx                 # Main navigation (sticky, with mobile menu)
├── Footer.tsx                 # Site footer with contact info
├── SectionWrapper.tsx         # Consistent section padding wrapper
├── ValueCard.tsx              # Animated value proposition cards
├── ContactForm.tsx            # Contact form (client-side validation)
└── TeamCard.tsx               # Team member profile cards

lib/
├── mongodb.ts                 # Database connection with caching
└── models/
    ├── User.ts               # Admin user model (email, password, role)
    └── BlogPost.ts           # Blog post model (title, slug, content, status)

types/
└── index.ts                   # TypeScript interfaces (User, BlogPost, ContactSubmission)
```

### Database Models

**User Schema** (`lib/models/User.ts`):
- `email` (unique, lowercase)
- `password` (bcrypt hashed)
- `name`
- `role` ('admin' | 'user')
- Timestamps (createdAt, updatedAt)

**BlogPost Schema** (`lib/models/BlogPost.ts`):
- `title`
- `slug` (unique, auto-generated from title)
- `content` (markdown supported)
- `status` ('draft' | 'published')
- `author` (optional)
- Timestamps (createdAt, updatedAt)

### API Endpoints

**Authentication**:
- `POST /api/auth/login` - Admin login, returns user object on success

**Blog Posts**:
- `GET /api/posts` - List all posts (optionally filter by status)
- `GET /api/posts/[id]` - Get single post by ID
- `GET /api/posts/slug/[slug]` - Get single post by slug (for public blog)
- `POST /api/posts` - Create new post
- `PUT /api/posts/[id]` - Update existing post
- `DELETE /api/posts/[id]` - Delete post

### Animation Patterns
- Use Framer Motion's `motion` components with `initial`, `whileInView`, `viewport` props
- Standard viewport config: `{ once: true, margin: "-100px" }`
- Common animations: `fadeInUp`, `staggerContainer` patterns
- Delays for stagger effects: increment by 0.1-0.2s per item

### Type Safety
- All components must have TypeScript interfaces for props
- Import types from `/types/index.ts` when available
- Use `Types.d.ts` declarations only for global augmentations (like `global.mongoose`)

### Styling Guidelines
- Use existing utility classes from `globals.css` before creating new ones
- Button styles: `.btn`, `.btn-primary`, `.btn-secondary`
- Card styles: `.card`, `.card-elevated`
- Input styles: `.input` with focus states
- Maintain consistent spacing with `SectionWrapper` component

## Business Context

**Company**: Danışmanım Yurtdışı Eğitim Danışmanlık
**Domain**: danismanim.co
**Purpose**: Educational consultancy helping students achieve international education goals

**Team Members**:
1. **Kartal Cihad Gültekin** - Founder & Student Mentor
   - Instagram: https://www.instagram.com/kartalcihadgultekin/
   - LinkedIn: https://nz.linkedin.com/in/kartal-cihad-gultekin-66a72069

2. **Gamze Nakışlı** - Business Development Manager & Public Relations

3. **Bharat Chawla** - RBS Intellect, NZ Specialist

**Global Partners**: New Zealand, United Kingdom, Dubai, Malta, USA, Germany, Singapore

**Contact Information**:
- Address: Çukurcuma Caddesi, Firuzağa Mah. No:52, Beyoğlu, İstanbul
- Phone: +90 545 279 7664
- Email: info@danismanim.co

**Mission**: Yüksek motivasyonlu belirli hedefi olan öğrenci adaylarına en başarılı ve en isabetli danışmanlık hizmetini vermek.

**Vision**: Hedefimiz öğrencilerimize doğru danışmanlık ve kaliteli rehberlik ile daha iyi bir gelecek kazandırmak.

## Important Notes

- The admin panel uses simple session-based authentication (not JWT). For production, consider upgrading to more secure auth.
- Default admin credentials are `admin@danismanim.co` / `admin123` - must be changed in production.
- MongoDB connection is cached globally to prevent connection pool exhaustion in serverless environments.
- Blog posts support markdown content with `react-markdown`, `rehype-raw`, and `rehype-sanitize`.
- All public pages are server-side rendered by default; admin pages can use client components.
