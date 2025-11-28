import mongoose, { Schema, Model } from 'mongoose';
import { BlogPost } from '@/types';

const BlogPostSchema = new Schema<BlogPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    author: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation during development
const BlogPostModel: Model<BlogPost> =
  mongoose.models.BlogPost || mongoose.model<BlogPost>('BlogPost', BlogPostSchema);

export default BlogPostModel;
