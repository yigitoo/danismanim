import mongoose from 'mongoose';

export interface IMeeting extends mongoose.Document {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  meetingDate: Date;
  meetingTime: string;
  duration: number; // in minutes
  googleMeetLink: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  emailSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MeetingSchema = new mongoose.Schema<IMeeting>(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    clientPhone: {
      type: String,
    },
    meetingDate: {
      type: Date,
      required: true,
    },
    meetingTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 30,
    },
    googleMeetLink: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for querying meetings by date
MeetingSchema.index({ meetingDate: 1 });

export default mongoose.models.Meeting ||
  mongoose.model<IMeeting>('Meeting', MeetingSchema);
