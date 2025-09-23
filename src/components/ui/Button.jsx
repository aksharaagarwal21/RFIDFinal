import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'default', 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center';
  
  const variants = {
    primary: 'bg-gradient-primary hover:bg-gradient-secondary text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100'
  };

  const sizes = {
    small: 'px-3 py-2 text-sm',
    default: 'px-6 py-3',
    large: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
