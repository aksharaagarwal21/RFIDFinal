import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Home, BookOpen, Coffee, Building, Shield, AlertCircle } from 'lucide-react';

const LocationTracking = () => {
  const [currentLocation, setCurrentLocation] = useState('Library');
  const [locationHistory] = useState([
    { id: 1, location: 'Library', time: '10:30 AM', duration: '2h 30m', date: '2025-09-22', type: 'study' },
    { id: 2, location: 'Mess Hall', time: '08:00 AM', duration: '30m', date: '2025-09-22', type: 'meal' },
    { id: 3, location: 'Classroom A101', time: '09:00 AM', duration: '1h 30m', date: '2025-09-22', type: 'class' },
    { id: 4, location: 'Hostel Room', time: '11:00 PM', duration: '8h', date: '2025-09-21', type: 'rest' },
    { id: 5, location: 'Computer Lab', time: '02:00 PM', duration: '2h', date: '2025-09-21', type: 'practical' }
  ]);
  
  const [permissions] = useState({
    hostel: { status: 'granted', expires: '2025-09-25', type: 'temporary' },
    library: { status: 'granted', expires: null, type: 'permanent' },
    lab: { status: 'granted', expires: '2025-12-31', type: 'semester' },
    mess: { status: 'granted', expires: null, type: 'permanent' }
  });

  const getLocationIcon = (type) => {
    switch (type) {
      case 'study':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'meal':
        return <Coffee className="w-5 h-5 text-orange-600" />;
      case 'class':
        return <Building className="w-5 h-5 text-green-600" />;
      case 'rest':
        return <Home className="w-5 h-5 text-purple-600" />;
      case 'practical':
        return <Shield className="w-5 h-5 text-red-600" />;
      default:
        return <MapPin className="w-5 h-5 text-gray-600" />;
    }
  };

  const getLocationColor = (type) => {
    switch (type) {
      case 'study':
        return 'bg-blue-100 text-blue-800';
      case 'meal':
        return 'bg-orange-100 text-orange-800';
      case 'class':
        return 'bg-green-100 text-green-800';
      case 'rest':
        return 'bg-purple-100 text-purple-800';
      case 'practical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPermissionStatus = (status) => {
    switch (status) {
      case 'granted':
        return { color: 'text-green-600', bg: 'bg-green-100', icon: '✓' };
      case 'pending':
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: '⏳' };
      case 'denied':
        return { color: 'text-red-600', bg: 'bg-red-100', icon: '✗' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', icon: '?' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Location Tracking</h2>
        <p className="text-gray-600">Your current location and movement history</p>
      </div>

      {/* Current Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-primary text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Current Location
            </h3>
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">{currentLocation}</div>
              <div className="text-sm opacity-90">Since 10:30 AM</div>
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
          >
            <MapPin className="w-8 h-8" />
          </motion.div>
        </div>
      </motion.div>

      {/* Access Permissions */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Access Permissions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(permissions).map(([area, permission], index) => {
            const statusInfo = getPermissionStatus(permission.status);
            return (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusInfo.bg}`}>
                    <span className={statusInfo.color}>{statusInfo.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 capitalize">{area}</p>
                    <p className="text-sm text-gray-600">
                      {permission.type} • {permission.expires ? `Expires: ${permission.expires}` : 'Permanent'}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                  {permission.status.charAt(0).toUpperCase() + permission.status.slice(1)}
                </span>
              </motion.div>
            );
          })}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 btn-primary w-full"
        >
          Request New Permission
        </motion.button>
      </div>

      {/* Location History */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Recent Location History
        </h3>
        <div className="space-y-4">
          {locationHistory.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getLocationColor(entry.type)}`}>
                  {getLocationIcon(entry.type)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{entry.location}</p>
                  <p className="text-sm text-gray-600">{entry.date} • {entry.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">{entry.duration}</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getLocationColor(entry.type)}`}>
                  {entry.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 border-l-4 border-green-400 bg-green-50"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-green-800">Security Status: Normal</h4>
            <p className="text-sm text-green-700">
              All access permissions are valid and no security alerts detected.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="card p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Location Report</h4>
              <p className="text-sm text-gray-600">Generate detailed location analysis</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="card p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Report Issue</h4>
              <p className="text-sm text-gray-600">Report location tracking problems</p>
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default LocationTracking;
