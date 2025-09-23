import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Shield } from 'lucide-react';

const RoleSelection = ({ onRoleSelect }) => {
  const roles = [
    {
      id: 'student',
      title: 'Student / Parent',
      description: 'Access attendance, grades, schedules, and campus services',
      icon: GraduationCap,
      color: 'from-primary-500 to-primary-600',
      features: ['Track Attendance', 'View Grades', 'Exam Schedules', 'Mess Access']
    },
    {
      id: 'teacher',
      title: 'Teacher / Faculty',
      description: 'Manage classes, track student progress, and create assessments',
      icon: BookOpen,
      color: 'from-secondary-500 to-secondary-600',
      features: ['Class Management', 'Attendance Tracking', 'Grade Students', 'Create Exams']
    },
    {
      id: 'warden',
      title: 'Warden / Administrator',
      description: 'Monitor security, manage access, and oversee campus operations',
      icon: Shield,
      color: 'from-accent-500 to-accent-600',
      features: ['Security Monitoring', 'Access Control', 'Student Tracking', 'Generate Reports']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Role</h2>
        <p className="text-gray-300">Select the option that best describes your position</p>
      </div>

      <div className="grid gap-4">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => onRoleSelect(role.id)}
            className="card p-6 cursor-pointer group hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              >
                <role.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-300 transition-colors duration-200">
                  {role.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {role.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  {role.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                      className="flex items-center space-x-2"
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${role.color} rounded-full`}></div>
                      <span className="text-sm text-gray-400">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="text-primary-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;
