import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, Home, Shield, Users, MapPin, AlertTriangle, 
  Clock, Settings, Bell, BarChart3
} from 'lucide-react';
import Sidebar from '../../common/Sidebar';
import HostelManagement from './HostelManagement';
import SecurityMonitoring from './SecurityMonitoring';
import StudentTracking from './StudentTracking';
import { useAuth } from '../../../contexts/AuthContext';

const WardenDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [dashboardData] = useState({
    totalStudents: 150,
    inHostel: 142,
    outOfHostel: 8,
    securityAlerts: 3,
    maintenanceRequests: 7,
    lateReturns: 2,
    notifications: 4
  });

  const { user } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', onClick: () => setActiveView('home') },
    { icon: Users, label: 'Students', onClick: () => setActiveView('students') },
    { icon: Shield, label: 'Security', onClick: () => setActiveView('security') },
    { icon: MapPin, label: 'Student Tracking', onClick: () => setActiveView('tracking') },
    { icon: Settings, label: 'Hostel Management', onClick: () => setActiveView('hostel') },
    { icon: BarChart3, label: 'Reports', onClick: () => setActiveView('reports') },
    { icon: Bell, label: 'Notifications', onClick: () => setActiveView('notifications'), badge: dashboardData.notifications }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'hostel':
        return <HostelManagement />;
      case 'security':
        return <SecurityMonitoring />;
      case 'tracking':
        return <StudentTracking />;
      case 'students':
        return <WardenStudents />;
      default:
        return <WardenHome />;
    }
  };

  const WardenHome = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome, Warden {user?.name}! 🏠
            </h2>
            <p className="opacity-90">
              {dashboardData.inHostel} students are currently in the hostel.
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Shield className="w-8 h-8 text-white" />
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
              <p className="text-sm text-gray-300 mb-1">In Hostel</p>
              <p className="text-2xl font-bold text-white">{dashboardData.inHostel}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
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
              <p className="text-sm text-gray-300 mb-1">Security Alerts</p>
              <p className="text-2xl font-bold text-white">{dashboardData.securityAlerts}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
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
              <p className="text-sm text-gray-300 mb-1">Late Returns</p>
              <p className="text-2xl font-bold text-white">{dashboardData.lateReturns}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Security Alerts</h3>
          <div className="space-y-3">
            {[
              { student: 'John Doe', issue: 'Late return', time: '11:30 PM', severity: 'medium' },
              { student: 'Jane Smith', issue: 'Unauthorized area access', time: '09:45 PM', severity: 'high' },
              { student: 'Mike Johnson', issue: 'Multiple failed attempts', time: '08:20 PM', severity: 'low' }
            ].map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-white">{alert.student}</p>
                  <p className="text-sm text-gray-300">{alert.issue}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-300">{alert.time}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Current Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Students In</span>
              <span className="font-bold text-green-600">{dashboardData.inHostel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Students Out</span>
              <span className="font-bold text-orange-600">{dashboardData.outOfHostel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Maintenance Requests</span>
              <span className="font-bold text-blue-600">{dashboardData.maintenanceRequests}</span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveView('security')}
                className="w-full btn-primary"
              >
                View Security Dashboard
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const WardenStudents = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Student Management</h2>
      <div className="card p-6">
        <p className="text-gray-300">Student management features will be displayed here.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
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
                <h1 className="text-2xl font-bold text-white">Warden Dashboard</h1>
                <p className="text-gray-300">Monitor hostel security and student activities</p>
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

export default WardenDashboard;
