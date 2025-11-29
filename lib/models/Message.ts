import mongoose from 'mongoose';

export interface IMessage extends mongoose.Document {
  conversationId: string;
  sender: 'visitor' | 'admin';
  senderName: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new mongoose.Schema<IMessage>(
  {
    conversationId: {
      type: String,
      required: true,
      index: true,
    },
    sender: {
      type: String,
      enum: ['visitor', 'admin'],
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Message ||
  mongoose.model<IMessage>('Message', MessageSchema);
