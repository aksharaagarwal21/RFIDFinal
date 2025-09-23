import db from '../../config/sqlite.js';

export class ParentProfile {
  static async create({ userId, ...profile }) {
    const stmt = db.prepare(`
      INSERT INTO parent_profiles (
        userId, childStudentId, contactNumber, address
      ) VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      userId,
      profile.childStudentId,
      profile.contactNumber || null,
      profile.address || null
    );
    
    return { _id: result.lastInsertRowid, userId, ...profile };
  }
}
