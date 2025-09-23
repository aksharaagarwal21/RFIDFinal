import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, Search } from 'lucide-react';

const StudentTracking = () => {
  const [students] = useState([
    {
      id: 1,
      name: 'John Doe',
      room: '101A',
      currentLocation: 'Library',
      lastSeen: '2 mins ago',
      status: 'inside'
    },
    {
      id: 2,
      name: 'Jane Smith',
      room: '203B',
      currentLocation: 'Outside Campus',
      lastSeen: '1 hour ago',
      status: 'outside'
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Student Tracking</h2>
        <p className="text-gray-600">Monitor student locations and movements</p>
      </div>

      {/* Search */}
      <div className="card p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Student List */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Student Locations</h3>
        <div className="space-y-4">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{student.name}</p>
                  <p className="text-sm text-gray-600">Room {student.room}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-gray-800">{student.currentLocation}</p>
                  <p className="text-sm text-gray-500">{student.lastSeen}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  student.status === 'inside' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {student.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTracking;
