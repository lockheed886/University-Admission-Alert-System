import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema(
  {
    universityName: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    courseName: {
      type: String,
      trim: true,
    },
    deadline: {
      type: Date,
    },
    ieltsRequired: {
      type: Boolean,
      default: false,
    },
    scholarshipAvailable: {
      type: Boolean,
      default: false,
    },
    scholarshipAmount: {
      type: String,
      trim: true,
    },
    additionalInfo: {
      type: String,
      trim: true,
    },
    applyingLink: {
      type: String,
      trim: true,
    },
    universityLink: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model re-initialization
export default mongoose.models.University ||
  mongoose.model('University', universitySchema);
