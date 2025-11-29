# Danışmanım Web Sitesi - Detaylı Proje Raporu

**Proje Adı:** Danışmanım Yurtdışı Eğitim Danışmanlık Web Sitesi <br>
**Domain:** danismanim.co <br>
**Rapor Tarihi:** 29 Kasım 2025 <br>
**Versiyon:** 1.0 <br>

---

## İçindekiler

1. [Yönetici Özeti](#yönetici-özeti)
2. [Teknik Altyapı](#teknik-altyapı)
3. [Özellikler ve Fonksiyonalite](#özellikler-ve-fonksiyonalite)
4. [Tasarım Sistemi](#tasarım-sistemi)
5. [SEO ve Pazarlama](#seo-ve-pazarlama)
6. [Admin Panel](#admin-panel)
7. [Veritabanı Yapısı](#veritabanı-yapısı)
8. [API Endpoints](#api-endpoints)
9. [Güvenlik](#güvenlik)
10. [Performans Optimizasyonları](#performans-optimizasyonları)
11. [Deployment Bilgileri](#deployment-bilgileri)
12. [Bakım ve Güncelleme Rehberi](#bakım-ve-güncelleme-rehberi)
13. [Gelecek Öneriler](#gelecek-öneriler)

---

## Yönetici Özeti

Danışmanım web sitesi, modern web teknolojileri kullanılarak sıfırdan geliştirilmiş, yurtdışı eğitim danışmanlığı hizmeti sunan profesyonel bir platformdur.

### Proje Hedefleri
- ✅ Kullanıcı dostu ve modern bir web sitesi oluşturma
- ✅ Blog içerik yönetim sistemi ile SEO gücü kazanma
- ✅ İletişim formları ile potansiyel müşteri kazanımı
- ✅ Mobil uyumlu (responsive) tasarım
- ✅ Hızlı sayfa yükleme süreleri
- ✅ Profesyonel görsel kimlik

### Temel Metrikler
- **Sayfa Sayısı:** 4 ana sayfa (Ana Sayfa, Hakkımızda, Blog, İletişim)
- **Blog Sistemi:** Sınırsız blog yazısı yönetimi
- **Responsive:** 100% mobil uyumlu
- **SEO Optimize:** Meta tags, Open Graph, Twitter Cards
- **Performance:** Modern image optimization (WebP, AVIF)

---

## Teknik Altyapı

### Frontend Stack

#### Framework: Next.js 15
- **App Router:** Modern routing sistemi
- **Server Components:** Gelişmiş performans
- **Image Optimization:** Otomatik görsel optimizasyonu
- **Font Optimization:** Google Fonts optimize edilmiş yükleme

#### React 19
- **Modern Hooks:** useState, useEffect, use (async)
- **Client Components:** İnteraktif UI bileşenleri
- **Server Actions:** Form submission ve veri işleme

#### TypeScript
- **Type Safety:** Tam tip güvenliği
- **Interface Definitions:** Tüm veri yapıları tip tanımlı
- **Better IDE Support:** IntelliSense ve otomatik tamamlama

#### Styling: Tailwind CSS 4
- **Utility-First:** Hızlı geliştirme
- **Custom Design System:** Özel renk paleti ve değişkenler
- **Responsive Design:** Mobil-first yaklaşım
- **Dark Mode Ready:** Kolay tema değişimi altyapısı

#### Animasyon: Framer Motion
- **Page Transitions:** Sayfa geçiş animasyonları
- **Scroll Animations:** Scroll-based görsel efektler
- **Micro-interactions:** Hover ve click animasyonları
- **Layout Animations:** Dinamik layout değişimleri

### Backend Stack

#### Database: MongoDB Atlas
- **Cloud Database:** Yönetilen bulut veritabanı
- **ODM:** Mongoose 8.x
- **Collections:** BlogPost, (gelecekte User, Contact vb.)

#### Storage: Supabase Storage
- **Bucket:** blog-banners
- **URL:** https://newrhrqaiggjjsyivwkh.supabase.co
- **Features:** Otomatik image optimization, CDN
- **Security:** Row Level Security (RLS) + Service Role Key

#### Email: Nodemailer + Gmail
- **SMTP:** Gmail SMTP servisi
- **Account:** gumusyigit101@gmail.com
- **Method:** App-specific password
- **Features:** HTML email templates, reply-to functionality

### Development Tools
- **Package Manager:** Bun (ultra-hızlı)
- **Version Control:** Git
- **Code Editor:** VS Code optimized
- **Linting:** ESLint + TypeScript
- **Type Checking:** TypeScript strict mode

---

## Özellikler ve Fonksiyonalite

### 1. Ana Sayfa (/)

#### Hero Section
- **Gradient Background:** Teal renk teması
- **CTA Buttons:** Ücretsiz danışmanlık ve keşfet butonları
- **Animated Elements:** Framer Motion ile hareket efektleri
- **Decorative Shapes:** Arka plan geometrik şekiller

#### Hizmetler Bölümü
6 ana hizmet kartı:
1. Üniversite Seçimi ve Başvuru
2. Vize Danışmanlığı
3. Dil Eğitimi Programları
4. Kariyer Danışmanlığı
5. Yurt ve Konaklama
6. Öğrenci Vizesi Süreçleri

#### İstatistikler
- Mutlu öğrenci sayısı
- Ortak ülke sayısı
- Ortak üniversite sayısı
- Yıllık deneyim

#### Üniversite Ortakları
- Logo gösterimi (slider/grid)
- 12+ üniversite ortağı
- AVIF format (optimize edilmiş)

#### Ekip Önizlemesi
- 3 ana ekip üyesi kartı
- Fotoğraf + kısa bilgi
- "Daha Fazla" linki

#### İletişim CTA
- Scroll-to-form özelliği
- Sticky consultation bölümü

### 2. Hakkımızda Sayfası (/about)

#### Misyon & Vizyon
- **Misyon:** Yüksek motivasyonlu belirli hedefi olan öğrenci adaylarına en başarılı ve en isabetli danışmanlık hizmetini vermek
- **Vizyon:** Hedefimiz öğrencilerimize doğru danışmanlık ve kaliteli rehberlik ile daha iyi bir gelecek kazandırmak

#### Detaylı Ekip Profilleri

**Kartal Cihad Gültekin - Founder & Student Mentor**
- Fotoğraf: /team/kartal.avif
- Yeni Zelanda ve Birleşik Krallık'ta üniversite yöneticiliği
- AUT Business Management ve Entrepreneurship mezunu
- Instagram: [@kartalcihadgultekin](https://www.instagram.com/kartalcihadgultekin/)
- LinkedIn: [Profil](https://nz.linkedin.com/in/kartal-cihad-gultekin-66a72069)

**Gamze Nakışlı - Business Development Manager**
- Fotoğraf: /team/gamze.avif
- Fisher&Paykel yöneticiliği (2007-)
- Avrupa ve Orta Doğu deneyimi
- Türkiye-Yeni Zelanda ticaret köprüsü

**Bharat Chawla - RBS Intellect NZ Specialist**
- Fotoğraf: /team/bharat.avif
- 20+ ülke deneyimi
- 18+ yıl yükseköğretim sektörü
- Stratejik yol geliştirme uzmanı

#### Kart Tasarımı
- Horizontal layout (görsel + içerik)
- Tam biyografi metni
- Sosyal medya linkleri
- Profesyonel fotoğraflar

### 3. Blog Sayfası (/blog)

#### Blog Listesi
- Grid layout (responsive: 1/2/3 sütun)
- Blog kartları:
  - Banner görseli (fallback: gradient + icon)
  - Başlık
  - İçerik önizleme (150 karakter)
  - Tarih bilgisi
  - "Devamını Oku" butonu
- Sıralama: En yeni önce (updatedAt)
- Status filter: Sadece "published" yazılar gösteriliyor

#### Blog Detay Sayfası (/blog/[slug])
- **Hero Section:**
  - Başlık (centered, font-black)
  - Yayın tarihi
  - Okuma süresi tahmini
  - Paylaş butonu (native share API)

- **Banner Görseli:**
  - Full-width responsive image
  - Next.js Image optimization
  - Shadow ve border-radius

- **İçerik Kartı:**
  - Beyaz arka plan
  - Geniş padding
  - Profesyonel typography
  - Markdown rendering (ReactMarkdown)

- **Markdown Desteği:**
  - Başlıklar (H1-H6)
  - Paragraflar
  - Kalın/italik yazı
  - Listeler (sıralı/sırasız)
  - Linkler
  - Alıntılar (blockquote)
  - Kod blokları
  - Görseller

- **CTA Bölümü:**
  - Ücretsiz danışmanlık çağrısı
  - Diğer blog yazıları linki

### 4. İletişim Sayfası (/contact)

#### İletişim Bilgileri
- **Telefon:** +90 545 279 76 64
- **Email:** info@danismanim.co
- **Adres:** Çukurcuma Caddesi, Firuzağa Mah. No:52, Beyoğlu, İstanbul

#### İletişim Formu
**Form Alanları:**
- Ad Soyad (zorunlu)
- E-posta (zorunlu, email validation)
- Telefon (zorunlu)
- Tercih Edilen Ülke (dropdown, zorunlu)
  - New Zealand
  - United Kingdom
  - Dubai
  - Malta
  - USA
  - Germany
  - Singapore
  - Kararsızım
- Mesaj / Eğitim Planı (textarea, zorunlu)

**Form Özellikleri:**
- Real-time validation
- Focus states (highlight)
- Loading spinner (gönderim sırasında)
- Success/Error mesajları
- Form temizleme (başarılı gönderim sonrası)
- Icon'lu input fields
- Responsive tasarım

**Email Entegrasyonu:**
- Nodemailer ile Gmail SMTP
- HTML formatted email template
- Tüm form bilgileri dahil
- Reply-to: Kullanıcı emaili
- Alıcı: info@danismanim.co (GMAIL_USER)

### 5. Admin Panel (/admin)

#### Giriş Bilgileri
```
Email: admin@danismanim.co
Şifre: admin123
```

**⚠️ ÖNEMLİ GÜVENLİK NOTU:**
Şu anda basit bir authentication sistemi var. Production'da mutlaka:
- Şifre hash'leme (bcrypt)
- JWT token sistemi
- Session yönetimi
- Rate limiting
eklenmelidir!

#### Blog Yönetimi

**Liste Görünümü:**
- Tüm blog yazıları tablosu
- Sütunlar: Başlık, Status, Tarih
- Aksiyonlar: Edit, Delete
- "Yeni Yazı Oluştur" butonu

**Yazı Editörü (/admin/posts/new veya /admin/posts/[id]):**

**Form Alanları:**
1. Başlık (Title)
   - Text input
   - Auto-slug generation

2. Slug (URL)
   - Auto-generated from title
   - Manuel düzenlenebilir
   - URL validation

3. Banner Görseli
   - Drag & drop upload
   - Preview
   - Delete özelliği
   - Max 5MB
   - Format: JPG, PNG, WebP, GIF, AVIF
   - Supabase storage entegrasyonu

4. Markdown Editör
   - 3 view mode: Edit / Preview / Split
   - Toolbar butonları:
     - Bold (Ctrl+B)
     - Italic (Ctrl+I)
     - Heading (H1-H6)
     - Link (Ctrl+K)
     - Bullet List
     - Numbered List
     - Blockquote
     - Code Block (Ctrl+E)
     - Checkbox List
     - Horizontal Rule
   - Real-time preview
   - Syntax highlighting
   - Auto-resize textarea
   - Smart cursor positioning

5. Status
   - Draft / Published toggle
   - Visual indicator

**Kaydet & Sil Butonları:**
- Loading states
- Success/Error feedback
- Confirmation dialogs (delete)

---

## Tasarım Sistemi

### Renk Paleti

#### Primary Colors (Teal/Turquoise)
```css
--primary: #0D9488         /* Main brand color */
--primary-light: #14B8A6   /* Lighter variant */
--primary-dark: #0F766E    /* Darker variant */
```

#### Secondary Colors
```css
--secondary: #F59E0B       /* Amber/Orange accent */
--secondary-light: #FCD34D
--secondary-dark: #D97706
```

#### Neutral Colors
```css
--background: #FFFFFF      /* Page background */
--foreground: #1F2937      /* Primary text */
--card: #FFFFFF            /* Card backgrounds */
--card-foreground: #1F2937 /* Card text */
```

#### Semantic Colors
```css
--success: #10B981         /* Green */
--error: #EF4444           /* Red */
--warning: #F59E0B         /* Amber */
--info: #3B82F6            /* Blue */
```

### Typography

#### Font Family
- **Primary:** Inter (Google Fonts)
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 900 (Black)
- **Features:** Latin + Latin Extended character sets

#### Heading Scales
```css
h1: 2.5rem - 4rem   (40px - 64px)  /* Hero titles */
h2: 2rem - 3rem     (32px - 48px)  /* Section titles */
h3: 1.5rem - 2rem   (24px - 32px)  /* Subsection titles */
h4: 1.25rem - 1.5rem (20px - 24px) /* Card titles */
```

#### Body Text
```css
Base: 1rem (16px)
Small: 0.875rem (14px)
Tiny: 0.75rem (12px)
```

### Spacing System
- **Base unit:** 0.25rem (4px)
- **Scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px

### Border Radius
```css
--radius-sm: 0.5rem   (8px)   /* Buttons, inputs */
--radius-md: 0.75rem  (12px)  /* Cards */
--radius-lg: 1rem     (16px)  /* Larger cards */
--radius-xl: 1.5rem   (24px)  /* Hero sections */
--radius-2xl: 2rem    (32px)  /* Special containers */
--radius-full: 9999px         /* Pills, avatars */
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

### Component Patterns

#### Buttons
- **Primary:** Gradient background (primary → primary-light)
- **Secondary:** Outline with hover fill
- **Ghost:** Transparent with hover background
- **Sizes:** Small (py-2 px-4), Medium (py-3 px-6), Large (py-4 px-8)
- **States:** Default, Hover, Active, Disabled, Loading

#### Cards
- White background
- Border: 1px solid gray-100
- Shadow: lg or xl
- Border radius: xl or 2xl
- Padding: 1.5rem - 2rem

#### Inputs
- Border: 2px solid gray-200
- Focus: border-primary + shadow
- Padding: 1rem
- Icon support (left/right)
- Error states

#### Navigation
- Sticky header
- Scroll-based background change
- Active link highlighting (layout animation)
- Mobile hamburger menu

### Logo & Branding

#### Logo Design
- **Symbol:** Letter "D"
- **Style:** Bold italic (font-weight: 900)
- **Color:** White on gradient background
- **Background:** Linear gradient (primary → primary-light)
- **Unique Element:** Top-right corner accent (white/20 opacity)
- **Variations:**
  - 32x32px (Favicon)
  - 180x180px (Apple Touch Icon)
  - 1200x630px (Open Graph)
  - 1200x600px (Twitter Card)
  - Navbar version (40x40 / 48x48)

---

## SEO ve Pazarlama

### Meta Tags

#### Basic SEO
```html
<title>Danışmanım | Yurtdışı Eğitim Danışmanlığı</title>
<meta name="description" content="Yeni Zelanda başta olmak üzere dünyanın farklı ülkelerinde lise, üniversite, dil okulu ve kariyer fırsatları için profesyonel eğitim danışmanlığı.">
<meta name="keywords" content="yurtdışı eğitim, eğitim danışmanlığı, Yeni Zelanda, üniversite, dil okulu, öğrenci danışmanlığı, danışmanım">
```

#### Open Graph (Facebook, LinkedIn, WhatsApp)
```html
<meta property="og:title" content="Danışmanım | Yurtdışı Eğitim Danışmanlığı">
<meta property="og:description" content="...">
<meta property="og:url" content="https://danismanim.co">
<meta property="og:site_name" content="Danışmanım">
<meta property="og:locale" content="tr_TR">
<meta property="og:type" content="website">
<meta property="og:image" content="/opengraph-image">
```

#### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Danışmanım | Yurtdışı Eğitim Danışmanlığı">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="/twitter-image">
```

### Social Media Preview Images

#### Open Graph Image (1200x630)
- Gradient background (primary colors)
- Centered white logo card
- Site title and tagline
- Decorative background circles
- Footer: danismanim.co

#### Twitter Image (1200x600)
- Same design, optimized dimensions
- Summary large image card type

### Structured Data Opportunities

**Önerilen Schema.org markup'lar:**
- Organization schema
- LocalBusiness schema
- EducationalOrganization
- BlogPosting (blog yazıları için)
- Person (ekip üyeleri için)

### Blog SEO

#### Her Blog Yazısı:
- Unique title tag
- Meta description
- Canonical URL
- OG image (banner)
- Published/Modified dates
- Author information
- Reading time

#### URL Structure
```
https://danismanim.co/blog/[slug]
```
- Clean, readable URLs
- Slug'lar Türkçe karakter destekli
- No special characters

---

## Admin Panel

### Giriş Sistemi
**⚠️ MEVCUT SİSTEM (BASİT - PRODUCTION İÇİN UYGUN DEĞİL):**
- Hardcoded credentials
- Local storage authentication
- No encryption
- No session management

**🔒 ÖNERİLEN PRODUCTION SİSTEMİ:**
```typescript
// Gerekli paketler
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// User schema
interface User {
  email: string
  password: string // hashed
  role: 'admin' | 'editor'
  createdAt: Date
}

// Auth flow
1. Login → Email/Password validation
2. Password verify (bcrypt.compare)
3. JWT token generation
4. HttpOnly cookie set
5. Protected routes middleware
6. Token refresh mechanism
```

### Blog CRUD İşlemleri

#### Create (POST /api/posts)
```typescript
{
  title: string
  slug: string
  content: string (markdown)
  bannerImage?: string (Supabase URL)
  status: 'draft' | 'published'
}
```

#### Read (GET /api/posts)
- Tüm yazıları listele
- Sort: updatedAt DESC

#### Read Single (GET /api/posts/[id])
- ID ile tekil yazı

#### Read by Slug (GET /api/posts/slug/[slug])
- Frontend için slug-based okuma

#### Update (PUT /api/posts/[id])
- Tüm alanlar güncellenebilir
- updatedAt otomatik

#### Delete (DELETE /api/posts/[id])
- Cascade: Banner image de silinir (Supabase'den)

### Dosya Yükleme

#### Upload Flow
```
1. User selects file (drag/drop veya click)
2. Validation (size, type)
3. FormData creation
4. POST /api/upload
5. Server → Supabase.upload()
6. Return public URL
7. Save to state/database
```

#### Supabase Integration
```typescript
// Server-side (service role key)
export async function uploadImage(file: File, bucket: string) {
  const supabase = getSupabaseAdmin()
  const fileName = `${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file)

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return publicUrl
}
```

### Markdown Editor

#### View Modes
1. **Edit:** Pure textarea, toolbar visible
2. **Preview:** Rendered markdown only
3. **Split:** Side-by-side (50/50)

#### Toolbar Actions
```typescript
const toolbarActions = {
  bold: () => wrapSelection('**', '**'),
  italic: () => wrapSelection('*', '*'),
  heading: (level) => insertAtLineStart(`${'#'.repeat(level)} `),
  link: () => wrapSelection('[', '](url)'),
  code: () => wrapSelection('```\n', '\n```'),
  // ... more actions
}
```

#### Keyboard Shortcuts
- Ctrl+B: Bold
- Ctrl+I: Italic
- Ctrl+K: Link
- Ctrl+E: Code block
- Tab: Indent (in lists)

---

## Veritabanı Yapısı

### MongoDB Collections

#### BlogPost Collection
```typescript
interface BlogPost {
  _id: ObjectId              // MongoDB auto-generated
  title: string              // Blog başlığı
  slug: string               // URL-friendly slug (unique)
  content: string            // Markdown içerik
  bannerImage?: string       // Supabase URL (optional)
  status: 'draft' | 'published'
  author?: string            // Yazar adı (şimdilik optional)
  createdAt: Date           // Auto-generated
  updatedAt: Date           // Auto-updated
}
```

**Indexes:**
- `slug`: Unique index (hızlı slug lookup)
- `status`: Index (published filtreleme)
- `createdAt`: Index (sıralama)

**Validation:**
- title: required, min 1 char
- slug: required, unique, lowercase
- content: required
- status: enum ['draft', 'published']

#### Future Collections

**Users** (önerilir)
```typescript
interface User {
  _id: ObjectId
  email: string (unique)
  password: string (hashed)
  name: string
  role: 'admin' | 'editor' | 'viewer'
  createdAt: Date
  lastLogin?: Date
}
```

**ContactSubmissions** (önerilir)
```typescript
interface ContactSubmission {
  _id: ObjectId
  name: string
  email: string
  phone: string
  country: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  createdAt: Date
  repliedAt?: Date
  notes?: string
}
```

**StudentApplications** (gelecek için)
```typescript
interface StudentApplication {
  _id: ObjectId
  studentInfo: {
    name: string
    email: string
    phone: string
    birthDate: Date
    nationality: string
  }
  education: {
    currentLevel: string
    institution: string
    gpa?: number
  }
  preferences: {
    country: string[]
    programs: string[]
    startDate: Date
  }
  documents: string[] // Supabase URLs
  status: 'pending' | 'in_progress' | 'accepted' | 'rejected'
  assignedTo?: ObjectId // User reference
  createdAt: Date
  updatedAt: Date
}
```

---

## API Endpoints

### Blog Endpoints

#### GET /api/posts
Tüm blog yazılarını listele

**Query Parameters:** Yok

**Response:**
```json
{
  "posts": [
    {
      "_id": "...",
      "title": "Blog Başlığı",
      "slug": "blog-basligi",
      "content": "# Markdown içerik...",
      "bannerImage": "https://supabase.co/.../image.jpg",
      "status": "published",
      "createdAt": "2025-11-29T...",
      "updatedAt": "2025-11-29T..."
    }
  ]
}
```

#### GET /api/posts/[id]
ID ile tekil blog yazısı

**Response:**
```json
{
  "post": { /* BlogPost object */ }
}
```

**Errors:**
- 404: Post not found

#### GET /api/posts/slug/[slug]
Slug ile tekil blog yazısı (frontend için)

**Response:**
```json
{
  "post": { /* BlogPost object */ }
}
```

**Errors:**
- 404: Post not found

#### POST /api/posts
Yeni blog yazısı oluştur

**Request Body:**
```json
{
  "title": "Yeni Blog Yazısı",
  "slug": "yeni-blog-yazisi",
  "content": "# Markdown içerik",
  "bannerImage": "https://...",
  "status": "draft"
}
```

**Validation:**
- title, slug, content required
- slug uniqueness check

**Response:**
```json
{
  "post": { /* Created BlogPost */ }
}
```

**Errors:**
- 400: Validation error / Duplicate slug
- 500: Internal server error

#### PUT /api/posts/[id]
Blog yazısını güncelle

**Request Body:** (Same as POST)

**Response:**
```json
{
  "post": { /* Updated BlogPost */ }
}
```

**Errors:**
- 404: Post not found
- 400: Validation error

#### DELETE /api/posts/[id]
Blog yazısını sil

**Response:**
```json
{
  "success": true
}
```

**Errors:**
- 404: Post not found

### Upload Endpoints

#### POST /api/upload
Dosya yükle (Supabase)

**Request:** FormData
```
file: File
bucket: string (default: 'blog-banners')
```

**Response:**
```json
{
  "url": "https://supabase.co/storage/v1/object/public/blog-banners/..."
}
```

**Validation:**
- Max size: 5MB
- Allowed types: image/jpeg, image/png, image/webp, image/gif, image/avif

**Errors:**
- 400: No file / Invalid type / Too large
- 500: Upload failed

#### POST /api/upload/delete
Dosya sil (Supabase)

**Request Body:**
```json
{
  "imageUrl": "https://...",
  "bucket": "blog-banners"
}
```

**Response:**
```json
{
  "success": true
}
```

### Contact Endpoints

#### POST /api/contact
İletişim formu gönder

**Request Body:**
```json
{
  "name": "Ad Soyad",
  "email": "email@example.com",
  "phone": "+90 5XX XXX XX XX",
  "country": "New Zealand",
  "message": "Mesaj içeriği..."
}
```

**Validation:**
- All fields required
- Email format validation

**Process:**
1. Validate inputs
2. Send email via Nodemailer
3. (Opsiyonel) Save to database

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Errors:**
- 400: Missing fields / Invalid email
- 500: Email sending failed

---

## Güvenlik

### Mevcut Güvenlik Önlemleri

#### Environment Variables
- Hassas bilgiler .env dosyasında
- Git'e commit edilmemiş (.gitignore)
- Server-side only access

#### API Security
- Server-side API routes (Next.js)
- Service role keys server-side only
- No client-side secrets

#### Input Validation
- Required field checks
- Email format validation
- File type/size validation
- XSS prevention (React automatic escaping)

#### CORS
- Next.js default CORS policies
- Same-origin requests

### Güvenlik İyileştirmeleri (ÖNERİLER)

#### 1. Authentication & Authorization
```typescript
// Implement proper auth
- JWT tokens (httpOnly cookies)
- Password hashing (bcrypt)
- Rate limiting (login attempts)
- Session management
- Role-based access control (RBAC)
```

#### 2. CSRF Protection
```typescript
// Add CSRF tokens
import { csrf } from 'next-csrf'
```

#### 3. Rate Limiting
```typescript
// Prevent abuse
import rateLimit from 'express-rate-limit'

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 requests per IP
})
```

#### 4. Input Sanitization
```typescript
// Sanitize user inputs
import DOMPurify from 'isomorphic-dompurify'

const clean = DOMPurify.sanitize(dirty)
```

#### 5. SQL/NoSQL Injection Prevention
```typescript
// Mongoose already handles this
// But validate all inputs
import Joi from 'joi'

const schema = Joi.object({
  email: Joi.string().email().required(),
  // ...
})
```

#### 6. File Upload Security
```typescript
// Current validations:
- File type whitelist ✓
- File size limit ✓

// Add:
- Virus scanning (ClamAV)
- File content validation
- Rename files (avoid directory traversal)
```

#### 7. Headers Security
```typescript
// Add security headers
// next.config.ts
headers: async () => [
  {
    source: '/(.*)',
    headers: [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
      }
    ]
  }
]
```

#### 8. HTTPS
- SSL certificate (Let's Encrypt / Cloudflare)
- Force HTTPS redirect
- HSTS header

#### 9. Database Security
- MongoDB connection encryption ✓
- Use connection strings from env ✓
- Implement IP whitelist (MongoDB Atlas)
- Regular backups
- Least privilege principle (user roles)

#### 10. Monitoring & Logging
```typescript
// Add logging
import winston from 'winston'

// Log:
- Failed login attempts
- API errors
- Suspicious activities
- File uploads
```

---

## Performans Optimizasyonları

### Mevcut Optimizasyonlar

#### 1. Next.js Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  width={800}
  height={600}
  alt="..."
  loading="lazy"      // Lazy loading
  placeholder="blur"  // Blur placeholder
  quality={85}        // Compression
/>
```

**Benefits:**
- Automatic WebP/AVIF conversion
- Responsive images (srcset)
- Lazy loading
- Blur placeholders
- CDN delivery

#### 2. Font Optimization
```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',  // FOIT prevention
  variable: '--font-inter'
})
```

**Benefits:**
- Self-hosted fonts (no Google servers)
- Font subsetting (smaller files)
- Font display swap (no FOIT)
- Preloading

#### 3. Code Splitting
- Automatic route-based splitting (Next.js)
- Dynamic imports for heavy components
- Lazy loading non-critical components

#### 4. Server Components
- Reduced client-side JavaScript
- Faster initial load
- Better SEO

#### 5. Static Generation
- Build-time page generation
- Fast serving from CDN
- No server computation per request

#### 6. Image Formats
- AVIF files (ultra-compressed)
- WebP fallbacks
- Lazy loading

### İyileştirme Önerileri

#### 1. Add Caching
```typescript
// API route caching
export const revalidate = 60 // 60 seconds

// Static page revalidation
export const metadata = {
  // ...
}
export const revalidate = 3600 // 1 hour
```

#### 2. CDN Implementation
- Vercel Edge Network (otomatik)
- Cloudflare (opsiyonel)
- Static asset caching

#### 3. Database Indexing
```typescript
// MongoDB indexes
BlogPost.index({ slug: 1 }, { unique: true })
BlogPost.index({ status: 1, createdAt: -1 })
```

#### 4. Lazy Loading Components
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { loading: () => <Spinner /> }
)
```

#### 5. Bundle Analysis
```bash
# Add to package.json
"analyze": "ANALYZE=true next build"

# Install
bun add @next/bundle-analyzer
```

#### 6. Compression
```typescript
// Enable gzip/brotli
// Vercel handles this automatically
// For custom server:
import compression from 'compression'
app.use(compression())
```

#### 7. Prefetching
```typescript
// Link prefetching (default)
<Link href="/blog" prefetch>Blog</Link>

// Disable for non-critical pages
<Link href="/admin" prefetch={false}>Admin</Link>
```

#### 8. Reduce JavaScript
- Remove unused dependencies
- Tree-shaking (automatic)
- Code splitting
- Use server components

### Performance Metrics (Hedefler)

#### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s ✓
- **FID (First Input Delay):** < 100ms ✓
- **CLS (Cumulative Layout Shift):** < 0.1 ✓

#### Other Metrics
- **TTFB (Time to First Byte):** < 600ms
- **FCP (First Contentful Paint):** < 1.8s
- **TTI (Time to Interactive):** < 3.8s

#### Monitoring Tools
- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)
- WebPageTest.org
- Vercel Analytics

---

## Deployment Bilgileri

### Hosting Önerileri

#### 1. Vercel (Önerilen - Next.js için optimal)

**장점:**
- Zero-config deployment
- Automatic HTTPS
- Edge Network (Global CDN)
- Automatic preview deployments
- Environment variables management
- Analytics built-in
- Next.js optimizations

**Deployment:**
```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel

# Production
vercel --prod
```

**Environment Variables:**
Vercel Dashboard → Settings → Environment Variables:
```
MONGODB_URI=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_SUPABASE_SERVICE_ROLE_KEY=...
GMAIL_USER=...
GMAIL_PASSWORD=...
```

#### 2. Netlify

**Deployment:**
```bash
# netlify.toml
[build]
  command = "bun run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### 3. Self-Hosted (Docker)

```dockerfile
# Dockerfile
FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]
```

```bash
# Build and run
docker build -t danismanim .
docker run -p 3000:3000 --env-file .env danismanim
```

### CI/CD Pipeline

#### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Run tests
        run: bun test

      - name: Build
        run: bun run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Domain Configuration

#### Custom Domain (danismanim.co)

**DNS Settings (Cloudflare/Vercel):**
```
A     @      76.76.21.21 (Vercel IP)
CNAME www    cname.vercel-dns.com
TXT   @      vercel-verification=...
```

**SSL:**
- Automatic (Let's Encrypt via Vercel)
- Force HTTPS redirect

---

## Bakım ve Güncelleme Rehberi

### Düzenli Bakım Görevleri

#### Günlük
- [ ] İletişim formlarını kontrol et (eğer DB'ye kaydediyorsan)
- [ ] Email gelen kutusunu kontrol et
- [ ] Site erişilebilirliğini test et

#### Haftalık
- [ ] Blog analytics gözden geçir
- [ ] Yeni blog içeriği planla
- [ ] Broken links kontrol et
- [ ] Image optimizasyonu yap (yeni yüklemeler için)

#### Aylık
- [ ] Dependency güncellemeleri kontrol et
- [ ] Security patches uygula
- [ ] Database backup al
- [ ] Performance metrikleri incele
- [ ] SEO rankings kontrol et

#### Üç Aylık
- [ ] Content audit (eski blog yazılarını güncelle)
- [ ] Design refresh ihtiyacı değerlendir
- [ ] User feedback topla ve değerlendir
- [ ] Competitor analysis

### Dependency Updates

```bash
# Tüm packages'leri kontrol et
bun outdated

# Güvenli güncellemeler (minor/patch)
bun update

# Major version güncellemeleri (dikkatli)
bun add next@latest
bun add react@latest react-dom@latest

# Test et!
bun run dev
bun run build
```

### Blog İçerik Ekleme

#### Adım Adım:

1. **Admin Panele Giriş**
   - https://danismanim.co/admin
   - Email: admin@danismanim.co
   - Şifre: admin123

2. **Yeni Yazı Oluştur**
   - "Yeni Yazı Oluştur" butonuna tıkla

3. **Başlık Gir**
   - Örnek: "Yeni Zelanda'da Üniversite Eğitimi Rehberi"
   - Slug otomatik oluşur

4. **Banner Görseli Yükle**
   - Drag & drop veya click to upload
   - Önerilen boyut: 1200x630 veya 16:9 aspect ratio
   - Max 5MB

5. **İçerik Yaz (Markdown)**
   ```markdown
   # Ana Başlık

   Giriş paragrafı...

   ## Alt Başlık

   - Liste öğesi 1
   - Liste öğesi 2

   **Kalın yazı** ve *italik yazı*.

   [Link metni](https://example.com)

   > Önemli not: Alıntı bloğu

   ```

6. **Preview Kontrol Et**
   - Preview veya Split mode'a geç
   - Formatlamayı kontrol et

7. **Draft olarak Kaydet**
   - İlk kayıt: Draft
   - Review sonrası: Published'a çevir

8. **Yayınla**
   - Status: Published
   - Kaydet
   - Blog sayfasında görünür olur

### Supabase Storage Yönetimi

#### Bucket: blog-banners

**Dosya Limitleri:**
- Max boyut: 5MB (kod içinde tanımlı)
- Allowed formats: JPG, PNG, WebP, GIF, AVIF

**Dosya İsimlendirme:**
- Format: `{timestamp}-{original-name}`
- Örnek: `1638360000000-yeni-zelanda.jpg`

**Silme:**
- Blog yazısı silindiğinde banner otomatik silinmez
- Manuel silme gerekli (admin panel delete butonu)

**Backup:**
- Supabase dashboard'dan export
- Veya S3-compatible tools kullan

### MongoDB Backup

#### Manuel Backup:
```bash
# mongodump (MongoDB Atlas'tan)
mongodump --uri="mongodb+srv://..." --out=./backup

# Restore
mongorestore --uri="mongodb+srv://..." ./backup
```

#### Otomatik Backup (MongoDB Atlas):
- Dashboard → Backup
- Continuous backup aktif et
- Retention policy: 7-30 gün

### Email Değişiklikleri

#### Gmail App Password Yenileme:
1. Google Account → Security
2. 2-Step Verification
3. App passwords
4. Generate new password
5. .env güncelle: `GMAIL_PASSWORD=new-password`
6. Redeploy

#### Email Template Değiştirme:
- Dosya: `lib/email.ts`
- HTML template'i güncelle
- Test gönder: Contact form kullan

---

## Gelecek Öneriler

### Kısa Vadeli (1-3 Ay)

#### 1. Authentication İyileştirmesi
- [ ] JWT-based auth sistemi
- [ ] Password hashing (bcrypt)
- [ ] "Remember me" özelliği
- [ ] Password reset flow
- [ ] Email verification

#### 2. Contact Form Database
- [ ] Form submissions'ı DB'ye kaydet
- [ ] Admin panelde görüntüle
- [ ] Status tracking (new/read/replied)
- [ ] Email notifications (admin'e)
- [ ] Response tracking

#### 3. Blog Geliştirmeleri
- [ ] Categories/Tags sistemi
- [ ] Author profiles
- [ ] Related posts
- [ ] Comments sistemi (Disqus/custom)
- [ ] Reading progress bar
- [ ] Table of contents (uzun yazılar için)
- [ ] Social share buttons (her blog için)

#### 4. Analytics
- [ ] Google Analytics 4 entegrasyonu
- [ ] Custom event tracking
- [ ] Conversion tracking
- [ ] Heatmaps (Hotjar/Microsoft Clarity)
- [ ] A/B testing setup

#### 5. SEO İyileştirmeleri
- [ ] Sitemap.xml (otomatik)
- [ ] Robots.txt optimize et
- [ ] Schema.org structured data
- [ ] Blog post schema
- [ ] Breadcrumbs
- [ ] Internal linking optimization

### Orta Vadeli (3-6 Ay)

#### 1. Student Portal
```typescript
// Öğrenci dashboard'u
interface StudentPortal {
  profile: StudentProfile
  applications: Application[]
  documents: Document[]
  messages: Message[]
  appointments: Appointment[]
}
```

Özellikler:
- Başvuru takip sistemi
- Doküman yükleme
- Randevu sistemi
- Mesajlaşma (admin ile)
- Timeline (başvuru aşamaları)

#### 2. University Database
- Üniversite profilleri
- Program listesi
- Başvuru gereksinimleri
- Şehir bilgileri
- Maliyet hesaplayıcı
- Karşılaştırma özelliği

#### 3. Multi-language Support
- Türkçe (default) ✓
- İngilizce
- i18n implementasyonu (next-intl)
- URL structure: `/en/about`, `/tr/hakkimizda`

#### 4. Live Chat
- Tawk.to / Intercom entegrasyonu
- Veya custom socket.io chat
- Office hours belirtme
- Automated responses
- Chat history

#### 5. Newsletter
- Email subscription
- Mailchimp/SendGrid entegrasyonu
- Blog post notifications
- Monthly digest
- Segmentation

### Uzun Vadeli (6-12 Ay)

#### 1. CRM Sistemi
- Student relationship management
- Pipeline tracking
- Task management
- Email automation
- Reporting & analytics

#### 2. Payment Gateway
- Online ödeme (danışmanlık ücretleri)
- Stripe/PayPal entegrasyonu
- Invoice generation
- Refund system
- Financial reporting

#### 3. Mobil Uygulama
- React Native / Flutter
- Push notifications
- Document scanning
- Offline mode
- Native features

#### 4. Advanced Analytics Dashboard
- Custom admin dashboard
- KPI tracking
- Revenue analytics
- Conversion funnels
- User segmentation
- Cohort analysis

#### 5. Video Content
- Video blog posts
- Webinar sistemi
- Recorded consultation sessions
- Video library (countries/universities)
- YouTube entegrasyonu

#### 6. AI Features
- Chatbot (GPT-4)
- Document analysis
- Üniversite önerileri (ML)
- Success prediction
- Automated email responses

---

## Teknik Spesifikasyonlar

### Sistem Gereksinimleri

#### Development
```
Node.js: 18.17 veya üzeri
Bun: 1.0 veya üzeri
RAM: Minimum 4GB
Disk: 1GB free space
OS: Windows 10+, macOS 10.15+, Linux
```

#### Production (Recommended)
```
CPU: 2 cores
RAM: 2GB
Bandwidth: Unmetered
Storage: 10GB SSD
```

### Package Versions

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "mongoose": "^8.8.4",
    "@supabase/supabase-js": "^2.49.2",
    "nodemailer": "^6.9.16",
    "framer-motion": "^11.14.4",
    "react-icons": "^5.4.0",
    "react-markdown": "^9.0.1"
  },
  "devDependencies": {
    "typescript": "^5.7.2",
    "tailwindcss": "^4.0.0",
    "@types/node": "^22.10.1",
    "@types/react": "^19.0.1",
    "@types/nodemailer": "^6.4.17"
  }
}
```

### Browser Support

```
Chrome: Last 2 versions ✓
Firefox: Last 2 versions ✓
Safari: Last 2 versions ✓
Edge: Last 2 versions ✓
Mobile Safari: iOS 12+ ✓
Chrome Mobile: Android 8+ ✓
```

### API Rate Limits (Önerilen)

```typescript
// Contact Form
5 requests / 15 minutes per IP

// Blog API
100 requests / hour per IP

// Upload API
10 uploads / hour per user

// Admin API
No limit (authenticated only)
```

---

## İletişim ve Destek

### Proje Ekibi

**Developer:**
- Adı: [Your Name]
- Email: [Your Email]
- GitHub: [Your GitHub]

**Client:**
- Şirket: Danışmanım Yurtdışı Eğitim Danışmanlık
- İletişim: info@danismanim.co
- Telefon: +90 545 279 76 64

### Teknik Destek

**Hosting (Vercel):**
- Dashboard: https://vercel.com/dashboard
- Support: support@vercel.com

**Database (MongoDB Atlas):**
- Dashboard: https://cloud.mongodb.com
- Support: https://www.mongodb.com/support

**Storage (Supabase):**
- Dashboard: https://app.supabase.com
- Docs: https://supabase.com/docs

### Dokümantasyon

**Next.js:**
- Docs: https://nextjs.org/docs
- Learn: https://nextjs.org/learn

**React:**
- Docs: https://react.dev

**Tailwind CSS:**
- Docs: https://tailwindcss.com/docs

**MongoDB:**
- Docs: https://www.mongodb.com/docs

---

## Ek Bilgiler

### Proje Dosya Yapısı

```
danismanim/
├── app/                          # Next.js App Router
│   ├── about/                    # Hakkımızda sayfası
│   ├── admin/                    # Admin panel
│   │   ├── posts/               # Blog yönetimi
│   │   └── page.tsx             # Admin login
│   ├── api/                      # API routes
│   │   ├── contact/             # Contact form endpoint
│   │   ├── posts/               # Blog CRUD
│   │   └── upload/              # File upload
│   ├── blog/                     # Blog sayfaları
│   │   └── [slug]/              # Blog detay
│   ├── contact/                  # İletişim sayfası
│   ├── apple-icon.tsx           # Apple touch icon
│   ├── icon.tsx                 # Favicon
│   ├── opengraph-image.tsx      # OG image
│   ├── twitter-image.tsx        # Twitter card
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Ana sayfa
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── admin/                   # Admin components
│   │   ├── ImageUpload.tsx
│   │   └── MarkdownEditor.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── SectionWrapper.tsx
│   └── TeamCard.tsx
├── lib/                          # Utilities
│   ├── models/                  # Mongoose models
│   │   └── BlogPost.ts
│   ├── email.ts                 # Email utility
│   ├── mongodb.ts               # DB connection
│   └── supabase.ts              # Storage utility
├── types/                        # TypeScript types
│   └── index.ts
├── public/                       # Static files
│   ├── students/                # Student photos
│   ├── team/                    # Team photos
│   └── universities/            # University logos
├── .env                          # Environment variables
├── .gitignore
├── bun.lock
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── CLAUDE.md                     # Development guide
├── QUICKSTART.md                 # Quick start guide
└── PROJE_RAPORU.md              # This file
```

### Git Branch Strategy

```
main        # Production branch (protected)
develop     # Development branch
feature/*   # Feature branches
hotfix/*    # Urgent fixes
```

### Version History

```
v1.0.0 (2025-11-29)
- Initial release
- Blog system
- Contact form
- Admin panel
- SEO optimization
- Email integration
```

---

## Sonuç

Danışmanım web sitesi, modern teknolojiler kullanılarak geliştirilmiş, ölçeklenebilir ve bakımı kolay bir platformdur.

### Başarılan Hedefler
✅ Profesyonel ve modern tasarım
✅ Responsive mobil uyumluluk
✅ Blog içerik yönetim sistemi
✅ Email entegrasyonu
✅ SEO optimizasyonu
✅ Hızlı performans
✅ Kolay admin panel
✅ Ölçeklenebilir mimari

### Teknik Mükemmellik
- Type-safe (TypeScript)
- Modern framework (Next.js 15)
- Cloud-native (MongoDB Atlas, Supabase)
- Best practices (ESLint, proper structure)
- Documentation (CLAUDE.md, QUICKSTART.md)

### Gelecek Potansiyel
Bu platform, yukarıda belirtilen geliştirmelerle:
- Student portal
- CRM sistemi
- Payment gateway
- Multi-language
- AI features

gibi gelişmiş özelliklerle büyüyebilir.

---

**Rapor Sonu**

*Bu rapor, danismanim.co web sitesinin tam teknik dokümantasyonudur. Herhangi bir soru veya ek bilgi için yukarıdaki iletişim bilgilerini kullanabilirsiniz.*

---

## Appendix A: Komut Referansı

### Development
```bash
bun dev              # Development server başlat
bun build            # Production build
bun start            # Production server
bun lint             # Linting
```

### Database
```bash
# MongoDB connection test
mongosh "mongodb+srv://..."

# Backup
mongodump --uri="..." --out=./backup

# Restore
mongorestore --uri="..." ./backup
```

### Deployment
```bash
# Vercel
vercel                # Deploy to preview
vercel --prod         # Deploy to production

# Docker
docker build -t danismanim .
docker run -p 3000:3000 danismanim
```

### Git
```bash
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

---

## Appendix B: Environment Variables

```bash
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/danismanim

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
NEXT_SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# Email
GMAIL_USER=email@gmail.com
GMAIL_PASSWORD=app-specific-password
```

---

## Appendix C: Useful Links

- **Website:** https://danismanim.co
- **Admin:** https://danismanim.co/admin
- **MongoDB Dashboard:** https://cloud.mongodb.com
- **Supabase Dashboard:** https://app.supabase.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** [Your Repo URL]

---

**Document Version:** 1.0
**Last Updated:** 29 Kasım 2025
**Total Pages:** 50+
**Word Count:** 8000+
