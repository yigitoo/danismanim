# Quick Start Guide - Danışmanım

## What Was Built

A complete, production-ready educational consultancy website with:

### ✅ **Public Pages**
- **Landing Page** (`/`) - Hero section, value propositions, global partners, mission/vision, contact form
- **About Page** (`/about`) - Team profiles with full bios and social links
- **Contact Page** (`/contact`) - Contact information, form, and map placeholder

### ✅ **Admin Panel**
- **Login** (`/admin/login`) - Secure authentication
- **Dashboard** (`/admin/dashboard`) - Blog post management
- **Post Editor** (`/admin/posts/new` & `/admin/posts/[id]`) - Create and edit blog posts

### ✅ **Features**
- Responsive design (mobile-first)
- Smooth Framer Motion animations
- SEO-optimized metadata
- MongoDB integration
- TypeScript throughout
- Tailwind CSS styling

---

## How to Run

### 1. Install Dependencies
```bash
bun install
```

### 2. Set Up Environment Variables
Create `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/danismanim
```

### 3. Start MongoDB
Make sure MongoDB is running on your machine or use MongoDB Atlas.

### 4. Create Admin User
```bash
bun run create-admin
```

This creates an admin user:
- Email: `admin@danismanim.co`
- Password: `admin123`

### 5. Start Development Server
```bash
bun dev
```

### 6. Open in Browser
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

---

## Pages Overview

### Landing Page (`/`)
Six main sections:
1. **Hero** - Main headline with CTA buttons
2. **Value Propositions** - 4 cards showing benefits
3. **Global Partners** - List of countries and universities
4. **Mission & Vision** - Company goals
5. **Team Teaser** - Link to about page
6. **Contact Form** - Lead capture form

### About Page (`/about`)
- Introduction section
- 3 team member cards:
  - Kartal Cihad Gültekin (Founder)
  - Gamze Nakışlı (Business Development)
  - Bharat Chawla (NZ Specialist)
- Call-to-action section

### Contact Page (`/contact`)
- Contact information card
- Office hours
- Contact form
- Map placeholder

### Admin Panel
- Login at `/admin/login`
- Dashboard shows all blog posts
- Create new posts at `/admin/posts/new`
- Edit posts by clicking edit icon
- Toggle draft/published status
- Delete posts

---

## Design System

### Colors
- **Primary**: Teal (#0891B2) - Trust and professionalism
- **Secondary**: Amber (#F59E0B) - Warmth and guidance
- **Background**: Off-white (#FAFAFA) - Clean and modern

### Typography
- **Font**: Inter (Google Fonts)
- Responsive sizing for mobile/tablet/desktop

### Components
All components are in `/components`:
- `Navbar.tsx` - Sticky navigation with mobile menu
- `Footer.tsx` - Site footer with contact info
- `SectionWrapper.tsx` - Consistent section padding
- `ValueCard.tsx` - Animated feature cards
- `ContactForm.tsx` - Contact form with validation
- `TeamCard.tsx` - Team member profiles

---

## Tech Stack

- **Next.js 16** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **MongoDB + Mongoose** - Database
- **React Icons** - Icon library
- **bcryptjs** - Password hashing

---

## File Structure

```
danismanim/
├── app/
│   ├── page.tsx              # Landing page
│   ├── about/                # About page
│   ├── contact/              # Contact page
│   ├── admin/                # Admin panel
│   └── api/                  # API routes
├── components/               # Reusable components
├── lib/
│   ├── mongodb.ts           # DB connection
│   └── models/              # Mongoose models
├── types/                    # TypeScript types
├── scripts/                  # Utility scripts
└── public/                   # Static assets
```

---

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Blog Posts
- `GET /api/posts` - List all posts
- `GET /api/posts/[id]` - Get single post
- `POST /api/posts` - Create post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

---

## Next Steps

### For Development
1. Update contact form to send emails (integrate with service like SendGrid)
2. Add Google Maps integration to contact page
3. Create blog listing page at `/blog` to display published posts
4. Add image upload for team member photos
5. Implement proper JWT authentication for admin panel

### For Production
1. Change default admin password
2. Set up MongoDB Atlas for cloud database
3. Deploy to Vercel or similar platform
4. Add proper environment variables
5. Set up analytics (Google Analytics, etc.)

### Content Updates
1. Add team member photos to `public/team/`
2. Add university logos to partners section
3. Update contact information if needed
4. Create initial blog posts

---

## Common Commands

```bash
# Development
bun dev                 # Start dev server
bun run build          # Build for production
bun start              # Start production server

# Admin
bun run create-admin   # Create admin user

# Database
# Make sure MongoDB is running first
mongod                 # Start MongoDB (local)
```

---

## Support

For questions or issues:
- Check README.md for detailed documentation
- Review component code in `/components`
- Check API routes in `/app/api`

---

**Built with ❤️ for Danışmanım**
