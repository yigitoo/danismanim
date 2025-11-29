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

// Chat types
export interface Conversation {
  _id?: string;
  visitorId: string;
  visitorName: string;
  visitorEmail?: string;
  status: 'active' | 'closed';
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Message {
  _id?: string;
  conversationId: string;
  sender: 'visitor' | 'admin';
  senderName: string;
  message: string;
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Meeting types
export interface Meeting {
  _id?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  meetingDate: Date;
  meetingTime: string;
  duration: number;
  googleMeetLink: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  emailSent: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
