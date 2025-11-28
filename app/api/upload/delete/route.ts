import { NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, bucket } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image URL provided' },
        { status: 400 }
      );
    }

    await deleteImage(imageUrl, bucket || 'blog-banners');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete image' },
      { status: 500 }
    );
  }
}
