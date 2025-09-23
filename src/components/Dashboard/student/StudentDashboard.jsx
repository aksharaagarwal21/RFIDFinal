import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, Home, User, MapPin, Clock, BookOpen, Trophy, 
  CreditCard, FileText, Shield, Bell, Calendar,
  CheckCircle
} from 'lucide-react';
import Sidebar from '../../common/Sidebar';
import AttendanceView from './AttendanceView';
import ExamHallTicket from './ExamHallTicket';
import MessAccess from './MessAccess';
import Gamification from './Gamification';
import LocationTracking from './LocationTracking';
import { useAuth } from '../../../contexts/AuthContext';
import { scanAPI, locationAPI } from '../../../services/api';

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [dashboardData, setDashboardData] = useState({
    attendance: { percentage: 85, present: 17, total: 20 },
    location: { current: '—', lastSeen: '—' },
    recentScans: 0,
    upcomingExam: null,
    messBalance: 0,
    todayMeals: 0,
    notifications: 0,
    badges: 0,
    points: 0
  });

  const { user } = useAuth();

  useEffect(() => {
    async function load() {
      try {
        // Last known location
        const lastRes = await locationAPI.last({ userId: user?.id });
        const last = lastRes.data?.location;
        // Recent scans count
        const scansRes = await scanAPI.recent({ userId: user?.id, limit: 10 });
        const scans = scansRes.data?.items || [];
        setDashboardData(prev => ({
          ...prev,
          location: {
            current: last?.area || (last?.latitude ? `${last.latitude.toFixed(3)}, ${last.longitude.toFixed(3)}` : 'Unknown'),
            lastSeen: last ? new Date(last.createdAt).toLocaleString() : 'No data'
          },
          recentScans: scans.length
        }));
      } catch (e) {
        // ignore errors on initial load
      }
    }
    if (user?.id) load();
  }, [user?.id]);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/student-dashboard', onClick: () => setActiveView('home') },
    { icon: User, label: 'Profile', onClick: () => setActiveView('profile') },
    { icon: MapPin, label: 'Current Location', onClick: () => setActiveView('location') },
    { icon: Clock, label: 'Attendance', onClick: () => setActiveView('attendance') },
    { icon: Calendar, label: "Today's Classes", onClick: () => setActiveView('classes') },
    { icon: FileText, label: 'Exam Hall Ticket', onClick: () => setActiveView('exam-ticket') },
    { icon: CreditCard, label: 'Mess Access', onClick: () => setActiveView('mess') },
    { icon: Trophy, label: 'Gamification', onClick: () => setActiveView('gamification') },
    { icon: Shield, label: 'Permissions', onClick: () => setActiveView('permissions') },
    { icon: Bell, label: 'Notifications', onClick: () => setActiveView('notifications'), badge: dashboardData.notifications }
  ];

  const quickAccessItems = [
    {
      title: 'Request Hostel Permission',
      description: 'Request permission to enter/exit hostel',
      icon: Shield,
      color: 'from-primary-500 to-primary-600',
      action: () => setActiveView('permissions')
    },
    {
      title: 'View Exam Hall Ticket',
      description: 'Download your exam hall tickets',
      icon: FileText,
      color: 'from-secondary-500 to-secondary-600',
      action: () => setActiveView('exam-ticket')
    },
    {
      title: 'Check Mess Balance',
      description: 'View mess balance and transaction history',
      icon: CreditCard,
      color: 'from-accent-500 to-accent-600',
      action: () => setActiveView('mess')
    }
  ];

  const StudentHome = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-primary text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h2>
            <p className="opacity-90">
              Here's what's happening with your academic journey today.
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 mb-1">Attendance</p>
              <p className="text-2xl font-bold text-white">{dashboardData.attendance.percentage}%</p>
              <p className="text-xs text-gray-400">{dashboardData.attendance.present}/{dashboardData.attendance.total} classes</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 mb-1">Location</p>
              <p className="text-lg font-bold text-white">{dashboardData.location.current}</p>
              <p className="text-xs text-gray-400">{dashboardData.location.lastSeen}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 mb-1">Recent Scans</p>
              <p className="text-2xl font-bold text-white">{dashboardData.recentScans}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300 mb-1">Points</p>
              <p className="text-2xl font-bold text-white">{dashboardData.points}</p>
              <p className="text-xs text-gray-400">{dashboardData.badges} badges earned</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickAccessItems.map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }} whileHover={{ scale: 1.02, y: -5 }} onClick={item.action} className="card p-6 cursor-pointer group">
              <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-white mb-2">{item.title}</h4>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const StudentProfile = () => (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <p className="text-gray-300">{user?.email}</p>
            <p className="text-sm text-gray-400">Role: {user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveView = () => {
    switch (activeView) {
      case 'attendance':
        return <AttendanceView />;
      case 'exam-ticket':
        return <ExamHallTicket />;
      case 'mess':
        return <MessAccess />;
      case 'gamification':
        return <Gamification />;
      case 'location':
        return <LocationTracking />;
      case 'profile':
        return <StudentProfile />;
      default:
        return <StudentHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        menuItems={menuItems}
      />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
                <Menu className="w-6 h-6" />
              </motion.button>
              <div>
                <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
                <p className="text-gray-300">Welcome to your academic portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button whileHover={{ scale: 1.05 }} className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100">
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
        <main className="flex-1 p-6 overflow-y-auto">{renderActiveView()}</main>
      </div>
    </div>
  );
};

export default StudentDashboard;
