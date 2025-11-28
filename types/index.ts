// User types
export interface User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

// Blog Post types
export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  bannerImage?: string;
  status: 'draft' | 'published';
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Contact Form types
export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}
