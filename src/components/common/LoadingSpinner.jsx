import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const LoadingSpinner = ({ size = 'default', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} bg-gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-lg`}
      >
        <Zap className={`${size === 'small' ? 'w-3 h-3' : size === 'large' ? 'w-8 h-8' : 'w-6 h-6'} text-white`} />
      </motion.div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-gray-600 font-medium"
      >
        {text}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
