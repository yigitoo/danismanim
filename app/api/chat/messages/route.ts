import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/lib/models/Message';
import Conversation from '@/lib/models/Conversation';

// GET - Get messages for a conversation
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    const since = searchParams.get('since');

    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      );
    }

    const query: any = { conversationId };
    if (since) {
      query.createdAt = { $gt: new Date(since) };
    }

    const messages = await Message.find(query).sort({ createdAt: 1 }).lean();

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST - Send a message
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { conversationId, sender, senderName, message } =
      await request.json();

    if (!conversationId || !sender || !senderName || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create message
    const newMessage = await Message.create({
      conversationId,
      sender,
      senderName,
      message,
      read: false,
    });

    // Update conversation
    const updateData: any = {
      lastMessage: message,
      lastMessageAt: new Date(),
    };

    // Increment unread count if message is from visitor
    if (sender === 'visitor') {
      await Conversation.findByIdAndUpdate(conversationId, {
        ...updateData,
        $inc: { unreadCount: 1 },
      });
    } else {
      await Conversation.findByIdAndUpdate(conversationId, updateData);
    }

    return NextResponse.json({ message: newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
