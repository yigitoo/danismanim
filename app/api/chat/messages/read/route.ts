import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/lib/models/Message';
import Conversation from '@/lib/models/Conversation';

// PUT - Mark messages as read
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const { conversationId, sender } = await request.json();

    if (!conversationId || !sender) {
      return NextResponse.json(
        { error: 'Conversation ID and sender are required' },
        { status: 400 }
      );
    }

    // Mark all messages from the specified sender as read
    const oppositeSender = sender === 'admin' ? 'visitor' : 'admin';

    await Message.updateMany(
      { conversationId, sender: oppositeSender, read: false },
      { read: true }
    );

    // Reset unread count if admin is reading
    if (sender === 'admin') {
      await Conversation.findByIdAndUpdate(conversationId, {
        unreadCount: 0,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return NextResponse.json(
      { error: 'Failed to mark messages as read' },
      { status: 500 }
    );
  }
}
