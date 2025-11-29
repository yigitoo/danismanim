import mongoose from 'mongoose';

export interface IConversation extends mongoose.Document {
  visitorId: string;
  visitorName: string;
  visitorEmail?: string;
  status: 'active' | 'closed';
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new mongoose.Schema<IConversation>(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },
    visitorName: {
      type: String,
      required: true,
    },
    visitorEmail: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'closed'],
      default: 'active',
    },
    lastMessage: {
      type: String,
    },
    lastMessageAt: {
      type: Date,
    },
    unreadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Conversation ||
  mongoose.model<IConversation>('Conversation', ConversationSchema);
