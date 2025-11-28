# Danışmanım - Yurtdışı Eğitim Danışmanlık

Modern, premium educational consultancy website built with Next.js, TypeScript, and MongoDB.

## Features

- **Landing Page** - Premium hero section, value propositions, global partners, mission/vision, and contact form
- **About Page** - Team profiles with social links and detailed bios
- **Contact Page** - Contact information, form, and map placeholder
- **Admin Panel** - Full-featured CMS for blog post management
- **Responsive Design** - Mobile-first approach with smooth animations
- **SEO Optimized** - Proper metadata and OpenGraph tags
- **MongoDB Integration** - User and blog post management

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Database**: MongoDB with Mongoose
- **Icons**: React Icons (Feather)
- **Authentication**: bcryptjs

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/danismanim.git
cd danismanim
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/danismanim
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/danismanim
```

4. Create admin user (make sure MongoDB is running):
```bash
bun run scripts/create-admin.ts
```

This will create an admin user with:
- Email: `admin@danismanim.co`
- Password: `admin123`

5. Run the development server:
```bash
bun dev
# or
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
danismanim/
├── app/
│   ├── (public routes)
│   │   ├── page.tsx          # Landing page
│   │   ├── about/            # About page
│   │   └── contact/          # Contact page
│   ├── admin/                # Admin panel
│   │   ├── login/            # Admin login
│   │   ├── dashboard/        # Post management
│   │   └── posts/[id]/       # Post editor
│   └── api/
│       ├── auth/             # Authentication endpoints
│       └── posts/            # Blog post CRUD endpoints
├── components/
│   ├── Navbar.tsx            # Main navigation
│   ├── Footer.tsx            # Site footer
│   ├── SectionWrapper.tsx    # Section container
│   ├── ValueCard.tsx         # Value proposition cards
│   ├── ContactForm.tsx       # Contact form component
│   └── TeamCard.tsx          # Team member cards
├── lib/
│   ├── mongodb.ts            # MongoDB connection
│   └── models/               # Mongoose models
│       ├── User.ts
│       └── BlogPost.ts
├── types/
│   └── index.ts              # TypeScript interfaces
└── scripts/
    └── create-admin.ts       # Admin user creation script
```

## Pages

### Public Pages

- **`/`** - Landing page with hero, values, partners, mission/vision, and contact form
- **`/about`** - About page with team information
- **`/contact`** - Contact page with form and information

### Admin Panel

- **`/admin/login`** - Admin login page
- **`/admin/dashboard`** - Blog post management dashboard
- **`/admin/posts/new`** - Create new blog post
- **`/admin/posts/[id]`** - Edit existing blog post

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Blog Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/[id]` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

## Design System

### Colors
- **Background**: Off-white (#FAFAFA)
- **Primary**: Calming teal (#0891B2)
- **Secondary**: Warm amber (#F59E0B)
- **Accent**: Soft indigo (#6366F1)

### Typography
- **Font Family**: Inter (Google Fonts)
- Mobile-first responsive sizing

### Components
All components use:
- Framer Motion for smooth animations
- Tailwind CSS for styling
- TypeScript for type safety
- Responsive design patterns

## MongoDB Setup

### Local MongoDB

1. Install MongoDB:
```bash
# macOS
brew install mongodb-community

# Windows
# Download from https://www.mongodb.com/try/download/community
```

2. Start MongoDB:
```bash
# macOS/Linux
mongod --config /usr/local/etc/mongod.conf

# Windows
net start MongoDB
```

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Add to `.env.local`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `MONGODB_URI`
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## Development

### Adding New Pages

1. Create new directory in `app/`
2. Add `page.tsx` for the page component
3. Add `layout.tsx` for metadata (optional)
4. Update navigation in `components/Navbar.tsx`

### Styling

All styles use Tailwind CSS with custom CSS variables defined in `app/globals.css`.

To modify colors:
```css
/* app/globals.css */
:root {
  --primary: #0891B2;
  --secondary: #F59E0B;
  /* ... */
}
```

### Database Models

Models are defined in `lib/models/`:
- `User.ts` - Admin users
- `BlogPost.ts` - Blog posts

To add new models:
1. Create new model file in `lib/models/`
2. Define schema with Mongoose
3. Export model
4. Use in API routes

## Admin Panel

The admin panel is a separate section of the site for managing blog posts.

### Features
- Secure login with bcrypt password hashing
- Create, read, update, delete blog posts
- Draft/Published status toggle
- Markdown content editor
- Automatic slug generation

### Access
- URL: `/admin/login`
- Default credentials:
  - Email: `admin@danismanim.co`
  - Password: `admin123`

**Important**: Change the default password after first login in production!

## Contact Information

**Danışmanım Yurtdışı Eğitim Danışmanlık**
- Address: Çukurcuma Caddesi, Firuzağa Mah. No:52, Beyoğlu, İstanbul
- Phone: +90 545 279 7664
- Email: info@danismanim.co

## License

This project is proprietary and confidential.

## Support

For issues and questions, contact the development team or create an issue in the repository.
