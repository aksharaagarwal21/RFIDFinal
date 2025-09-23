import mongoose from 'mongoose';

const teacherProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    teacherId: { type: String, required: true, index: true },
    department: { type: String },
    cabinNumber: { type: String },
    contactNumber: { type: String }
  },
  { timestamps: true, versionKey: false }
);

export const TeacherProfile = mongoose.models.TeacherProfile || mongoose.model('TeacherProfile', teacherProfileSchema);
