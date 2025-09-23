import mongoose from 'mongoose';

const wardenProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    hostel: { type: String, required: true },
    floorIncharge: { type: String },
    contactNumber: { type: String }
  },
  { timestamps: true, versionKey: false }
);

export const WardenProfile = mongoose.models.WardenProfile || mongoose.model('WardenProfile', wardenProfileSchema);
