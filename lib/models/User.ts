import mongoose, { Schema, Model } from 'mongoose';
import { User } from '@/types';

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation during development
const UserModel: Model<User> =
  mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
