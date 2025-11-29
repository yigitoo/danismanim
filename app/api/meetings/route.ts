import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Meeting from '@/lib/models/Meeting';

// GET - Get all meetings
export async function GET() {
  try {
    await connectDB();

    const meetings = await Meeting.find()
      .sort({ meetingDate: 1, meetingTime: 1 })
      .lean();

    return NextResponse.json({ meetings });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}

// POST - Create new meeting
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const {
      clientName,
      clientEmail,
      clientPhone,
      meetingDate,
      meetingTime,
      duration,
      googleMeetLink,
      notes,
    } = await request.json();

    if (!clientName || !clientEmail || !meetingDate || !meetingTime || !googleMeetLink) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const meeting = await Meeting.create({
      clientName,
      clientEmail,
      clientPhone,
      meetingDate,
      meetingTime,
      duration: duration || 30,
      googleMeetLink,
      notes,
      status: 'scheduled',
      emailSent: false,
    });

    return NextResponse.json({ meeting });
  } catch (error) {
    console.error('Error creating meeting:', error);
    return NextResponse.json(
      { error: 'Failed to create meeting' },
      { status: 500 }
    );
  }
}
