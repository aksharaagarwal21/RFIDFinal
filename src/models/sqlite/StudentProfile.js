import db from '../../config/sqlite.js';

export class StudentProfile {
  static async create({ userId, ...profile }) {
    const stmt = db.prepare(`
      INSERT INTO student_profiles (
        userId, registrationNumber, department, year, className, 
        section, hostel, roomNumber, personalEmail, collegeEmail, contactNumber
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      userId,
      profile.registrationNumber,
      profile.department || null,
      profile.year || null,
      profile.className || null,
      profile.section || null,
      profile.hostel || null,
      profile.roomNumber || null,
      profile.personalEmail || null,
      profile.collegeEmail || null,
      profile.contactNumber || null
    );
    
    return { _id: result.lastInsertRowid, userId, ...profile };
  }
}
