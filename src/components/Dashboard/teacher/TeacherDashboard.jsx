import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, Home, Users, BookOpen, FileText, BarChart3, 
  Calendar, CheckCircle, Bell
} from 'lucide-react';
import Sidebar from '../../common/Sidebar';
import ClassManagement from './ClassManagement';
import AttendanceManagement from './AttendanceManagement';
import ExamManagement from './ExamManagement';
import { useAuth } from '../../../contexts/AuthContext';

const TeacherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [dashboardData] = useState({
    totalStudents: 120,
    totalClasses: 8,
    todayClasses: 3,
    attendanceRate: 87,
    pendingGrading: 15,
    upcomingExams: 2,
    notifications: 5
  });

  const { user } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', onClick: () => setActiveView('home') },
    { icon: Users, label: 'My Classes', onClick: () => setActiveView('classes') },
    { icon: CheckCircle, label: 'Attendance', onClick: () => setActiveView('attendance') },
    { icon: FileText, label: 'Exams & Grades', onClick: () => setActiveView('exams') },
    { icon: BarChart3, label: 'Analytics', onClick: () => setActiveView('analytics') },
    { icon: Calendar, label: 'Schedule', onClick: () => setActiveView('schedule') },
    { icon: Bell, label: 'Notifications', onClick: () => setActiveView('notifications'), badge: dashboardData.notifications }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'classes':
        return <ClassManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'exams':
        return <ExamManagement />;
      case 'analytics':
        return <TeacherAnalytics />;
      case 'schedule':
        return <TeacherSchedule />;
      default:
        return <TeacherHome />;
    }
  };

  const TeacherHome = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-secondary text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Good morning, Prof. {user?.name}! 👨‍🏫
            </h2>
            <p className="opacity-90">
              You have {dashboardData.todayClasses} classes scheduled today.
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <BookOpen className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 mb-1">Total Students</p>
              <p className="text-2xl font-bold text-white">{dashboardData.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 mb-1">My Classes</p>
              <p className="text-2xl font-bold text-white">{dashboardData.totalClasses}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 mb-1">Attendance Rate</p>
              <p className="text-2xl font-bold text-white">{dashboardData.attendanceRate}%</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 mb-1">Pending Grading</p>
              <p className="text-2xl font-bold text-white">{dashboardData.pendingGrading}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Today's Schedule */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-white mb-4">Today's Classes</h3>
        <div className="space-y-4">
          {[
            { subject: 'Database Systems', time: '09:00 AM - 10:30 AM', room: 'A101', students: 45 },
            { subject: 'Software Engineering', time: '11:00 AM - 12:30 PM', room: 'B201', students: 38 },
            { subject: 'Computer Networks', time: '02:00 PM - 03:30 PM', room: 'C301', students: 42 }
          ].map((class_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{class_.subject}</p>
                  <p className="text-sm text-gray-300">{class_.time} - {class_.room}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">{class_.students} students</p>
                <button className="text-sm text-secondary-600 hover:text-secondary-700">
                  Take Attendance
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveView('attendance')}
          className="card p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Take Attendance</h4>
              <p className="text-sm text-gray-300">Mark attendance for your classes</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveView('exams')}
          className="card p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Create Exam</h4>
              <p className="text-sm text-gray-300">Schedule new examinations</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveView('analytics')}
          className="card p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-white">View Analytics</h4>
              <p className="text-sm text-gray-300">Student performance insights</p>
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );

  const TeacherAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
      <div className="card p-6">
        <p className="text-gray-300">Analytics and reporting features will be displayed here.</p>
      </div>
    </div>
  );

  const TeacherSchedule = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Class Schedule</h2>
      <div className="card p-6">
        <p className="text-gray-300">Weekly schedule and timetable will be displayed here.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        menuItems={menuItems}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </motion.button>
              <div>
                <h1 className="text-2xl font-bold text-white">Teacher Dashboard</h1>
                <p className="text-gray-300">Manage your classes and students</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100"
              >
                <Bell className="w-6 h-6 text-gray-300" />
                {dashboardData.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {dashboardData.notifications}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
