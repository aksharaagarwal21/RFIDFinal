import db from '../../config/sqlite.js';

export class TeacherProfile {
  static async create({ userId, ...profile }) {
    const stmt = db.prepare(`
      INSERT INTO teacher_profiles (
        userId, teacherId, department, cabinNumber, contactNumber
      ) VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      userId,
      profile.teacherId,
      profile.department || null,
      profile.cabinNumber || null,
      profile.contactNumber || null
    );
    
    return { _id: result.lastInsertRowid, userId, ...profile };
  }
}
