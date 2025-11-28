import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client (only available on server)
export function getSupabaseAdmin() {
  const supabaseServiceKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseServiceKey) {
    throw new Error('Missing NEXT_SUPABASE_SERVICE_ROLE_KEY environment variable');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

/**
 * Upload an image to Supabase storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name (default: 'blog-banners')
 * @param folder - Optional folder path within the bucket
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  bucket: string = 'blog-banners',
  folder: string = ''
): Promise<string> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload file using admin client (bypasses RLS)
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      if (error.message.includes('Bucket not found')) {
        throw new Error(`Supabase bucket '${bucket}' not found. Please create it in your Supabase dashboard: Storage > New Bucket > Name: ${bucket} > Make it Public`);
      }
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Delete an image from Supabase storage
 * @param imageUrl - The public URL of the image to delete
 * @param bucket - The storage bucket name (default: 'blog-banners')
 */
export async function deleteImage(
  imageUrl: string,
  bucket: string = 'blog-banners'
): Promise<void> {
  try {
    // Extract file path from URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split(`/storage/v1/object/public/${bucket}/`);
    if (pathParts.length < 2) {
      throw new Error('Invalid image URL');
    }
    const filePath = pathParts[1];

    // Delete file using admin client (bypasses RLS)
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}
