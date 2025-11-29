import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Conversation from '@/lib/models/Conversation';

// In-memory rate limiter (IP-based)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit: Max 3 conversations per IP per 5 minutes
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes in milliseconds

function checkRateLimit(ip: string): { allowed: boolean; resetIn?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up old records periodically
  if (Math.random() < 0.01) { // 1% chance to clean up
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const resetIn = Math.ceil((record.resetTime - now) / 1000); // seconds
    return { allowed: false, resetIn };
  }

  record.count += 1;
  return { allowed: true };
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

// GET - Get all conversations (for admin)
export async function GET() {
  try {
    await connectDB();

    const conversations = await Conversation.find()
      .sort({ lastMessageAt: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}

// POST - Create new conversation
export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIp = getClientIp(request);
    const rateLimitCheck = checkRateLimit(clientIp);

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Çok fazla sohbet başlatma isteği. Lütfen birkaç dakika bekleyip tekrar deneyin.',
          resetIn: rateLimitCheck.resetIn,
        },
        { status: 429 }
      );
    }

    await connectDB();

    const { visitorId, visitorName, visitorEmail } = await request.json();

    if (!visitorId || !visitorName) {
      return NextResponse.json(
        { error: 'Visitor ID and name are required' },
        { status: 400 }
      );
    }

    // Block admin emails from creating chat sessions
    const adminEmails = ['admin@danismanim.co'];
    if (visitorEmail && adminEmails.includes(visitorEmail.toLowerCase())) {
      return NextResponse.json(
        { error: 'Admin accounts cannot create chat sessions' },
        { status: 403 }
      );
    }

    // Always create a new conversation for each chat session
    const conversation = await Conversation.create({
      visitorId,
      visitorName,
      visitorEmail,
      status: 'active',
      unreadCount: 0,
    });

    return NextResponse.json({ conversation });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}
