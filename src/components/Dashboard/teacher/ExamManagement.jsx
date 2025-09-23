import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Clock, MapPin, Users, Edit, Trash2, FileText } from 'lucide-react';

const ExamManagement = () => {
  const [exams] = useState([
    {
      id: 1,
      title: 'Database Systems Midterm',
      subject: 'CSE301',
      date: '2025-09-25',
      time: '09:00 AM - 12:00 PM',
      duration: '3 hours',
      hall: 'Hall A',
      students: 45,
      type: 'Midterm',
      status: 'Scheduled'
    },
    {
      id: 2,
      title: 'Software Engineering Quiz',
      subject: 'CSE302',
      date: '2025-09-28',
      time: '11:00 AM - 12:00 PM',
      duration: '1 hour',
      hall: 'Room B201',
      students: 38,
      type: 'Quiz',
      status: 'Scheduled'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Exam Management</h2>
          <p className="text-gray-300">Create and manage examinations</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Exam</span>
        </motion.button>
      </div>

      <div className="space-y-4">
        {exams.map((exam, index) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-xl font-bold text-white">{exam.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    exam.type === 'Midterm' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {exam.type}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{exam.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{exam.hall}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{exam.students} students</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                >
                  <Edit className="w-4 h-4 text-gray-300" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </motion.button>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-300">Status: {exam.status}</span>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-sm"
                >
                  Manage Students
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-sm"
                >
                  Add Grades
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExamManagement;
