import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    serviceType: {
      type: String,
      default: 'mobile-app',
      trim: true,
    },
    timeline: {
      type: String,
      default: '1-3-months',
      trim: true,
    },
    projectDetails: {
      type: String,
      required: [true, 'Project details are required'],
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['new', 'in-review', 'responded'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.model('Contact', ContactSchema);
