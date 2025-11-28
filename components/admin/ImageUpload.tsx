'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  helperText?: string;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  label = 'Banner Image',
  helperText = 'Recommended size: 1200x630px (JPG, PNG, WebP)',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPG, PNG, WebP, or GIF)');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('File size must be less than 5MB');
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload via API route
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', 'blog-banners');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const { url: imageUrl } = await response.json();

      clearInterval(progressInterval);
      setUploadProgress(100);

      onChange(imageUrl);

      // Reset after a short delay
      setTimeout(() => {
        setUploadProgress(0);
      }, 500);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    try {
      // Delete via API route
      const response = await fetch('/api/upload/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: value,
          bucket: 'blog-banners',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      if (onRemove) {
        onRemove();
      } else {
        onChange('');
      }
    } catch (err) {
      console.error('Delete error:', err);
      // Still remove from UI even if delete fails
      if (onRemove) {
        onRemove();
      } else {
        onChange('');
      }
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      {/* Upload Area */}
      {!value ? (
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
            id="banner-upload"
          />
          <label
            htmlFor="banner-upload"
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
              isUploading
                ? 'border-primary bg-primary/5 cursor-not-allowed'
                : 'border-gray-300 hover:border-primary hover:bg-gray-50'
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">Uploading...</p>
                  <div className="w-48 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{uploadProgress}%</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 px-6 text-center">
                <div className="p-4 bg-gray-100 rounded-full">
                  <FiUpload className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{helperText}</p>
                </div>
              </div>
            )}
          </label>
        </div>
      ) : (
        /* Preview Area */
        <div className="relative group">
          <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-gray-200">
            <Image
              src={value}
              alt="Banner preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
              <label
                htmlFor="banner-upload"
                className="px-4 py-2 bg-white text-gray-800 rounded-lg font-medium cursor-pointer hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <FiUpload className="w-4 h-4" />
                Change
              </label>
              <button
                type="button"
                onClick={handleRemove}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <FiX className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
            id="banner-upload"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <FiX className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Helper Text */}
      {!value && !error && helperText && (
        <p className="text-xs text-gray-500 flex items-center gap-1.5">
          <FiImage className="w-3.5 h-3.5" />
          {helperText}
        </p>
      )}
    </div>
  );
}
