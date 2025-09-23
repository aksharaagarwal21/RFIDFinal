import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    registrationNumber: { type: String, required: true, index: true },
    department: { type: String },
    year: { type: String },
    className: { type: String },
    section: { type: String },
    hostel: { type: String },
    roomNumber: { type: String },
    personalEmail: { type: String },
    collegeEmail: { type: String },
    contactNumber: { type: String }
  },
  { timestamps: true, versionKey: false }
);

export const StudentProfile = mongoose.models.StudentProfile || mongoose.model('StudentProfile', studentProfileSchema);
