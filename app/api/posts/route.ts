import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPostModel from '@/lib/models/BlogPost';

// GET all posts
export async function GET() {
  try {
    await connectDB();

    const posts = await BlogPostModel.find().sort({ updatedAt: -1 });

    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// CREATE new post
export async function POST(request: NextRequest) {
  try {
    const { title, slug, content, bannerImage, status } = await request.json();

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if slug already exists
    const existingPost = await BlogPostModel.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    const post = await BlogPostModel.create({
      title,
      slug,
      content,
      bannerImage,
      status: status || 'draft',
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
