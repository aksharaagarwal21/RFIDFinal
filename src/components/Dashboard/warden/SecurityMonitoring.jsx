import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Clock, MapPin, Eye } from 'lucide-react';

const SecurityMonitoring = () => {
  const [securityAlerts] = useState([
    {
      id: 1,
      student: 'John Doe',
      type: 'Late Entry',
      location: 'Main Gate',
      time: '11:45 PM',
      severity: 'medium',
      status: 'active'
    },
    {
      id: 2,
      student: 'Jane Smith',
      type: 'Unauthorized Access',
      location: 'Restricted Area',
      time: '10:30 PM',
      severity: 'high',
      status: 'resolved'
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Security Monitoring</h2>
        <p className="text-gray-600">Monitor security alerts and incidents</p>
      </div>

      {/* Live Security Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-to-r from-green-500 to-blue-600 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Security Status: ACTIVE</h3>
            <p className="opacity-90">All systems operational • {securityAlerts.length} active alerts</p>
          </div>
          <Shield className="w-12 h-12 opacity-80" />
        </div>
      </motion.div>

      {/* Security Alerts */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Security Alerts</h3>
        <div className="space-y-4">
          {securityAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <AlertTriangle className={`w-6 h-6 ${
                  alert.severity === 'high' ? 'text-red-500' :
                  alert.severity === 'medium' ? 'text-yellow-500' :
                  'text-green-500'
                }`} />
                <div>
                  <p className="font-semibold text-gray-800">{alert.student}</p>
                  <p className="text-sm text-gray-600">{alert.type} • {alert.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">{alert.time}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="btn-primary text-sm"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityMonitoring;
