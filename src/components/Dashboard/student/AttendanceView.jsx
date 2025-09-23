import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, BarChart3 } from 'lucide-react';

const AttendanceView = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [attendanceData, setAttendanceData] = useState({
    overall: { percentage: 85, present: 85, total: 100 },
    subjects: [
      { name: 'Database Systems', percentage: 90, present: 18, total: 20, color: 'bg-green-500' },
      { name: 'Software Engineering', percentage: 85, present: 17, total: 20, color: 'bg-blue-500' },
      { name: 'Computer Networks', percentage: 80, present: 16, total: 20, color: 'bg-yellow-500' },
      { name: 'Machine Learning', percentage: 75, present: 15, total: 20, color: 'bg-orange-500' }
    ],
    todaySchedule: [
      { subject: 'Database Systems', time: '09:00 AM', room: 'A101', status: 'present' },
      { subject: 'Software Engineering', time: '11:00 AM', room: 'B201', status: 'pending' },
      { subject: 'Computer Networks', time: '02:00 PM', room: 'C301', status: 'pending' }
    ]
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Attendance Overview</h2>
          <p className="text-gray-600">Track your class attendance and performance</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input-field"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
          </select>
        </div>
      </div>

      {/* Overall Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-primary text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Overall Attendance</h3>
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold">{attendanceData.overall.percentage}%</div>
              <div className="text-sm opacity-90">
                {attendanceData.overall.present}/{attendanceData.overall.total} classes attended
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <TrendingUp className="w-8 h-8" />
          </motion.div>
        </div>
      </motion.div>

      {/* Today's Schedule */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Today's Classes
        </h3>
        <div className="space-y-3">
          {attendanceData.todaySchedule.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(item.status)}
                <div>
                  <p className="font-semibold text-gray-800">{item.subject}</p>
                  <p className="text-sm text-gray-600">{item.time} - {item.room}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.status === 'present' ? 'bg-green-100 text-green-800' :
                item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subject-wise Attendance */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Subject-wise Attendance
        </h3>
        <div className="space-y-4">
          {attendanceData.subjects.map((subject, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800">{subject.name}</span>
                <span className="text-sm text-gray-600">
                  {subject.present}/{subject.total} ({subject.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`h-2 rounded-full ${subject.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="card p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Detailed Report</h4>
              <p className="text-sm text-gray-600">View comprehensive attendance analysis</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="card p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Class Schedule</h4>
              <p className="text-sm text-gray-600">View your complete timetable</p>
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default AttendanceView;
