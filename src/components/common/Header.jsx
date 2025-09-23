import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Zap, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
    <motion.div
      animate={{
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md"
    >
      <Zap className="w-5 h-5 text-white" />
    </motion.div>
    <span className="text-xl font-semibold text-secondary-800">RFID University</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
    <motion.a
      key={item.name}
      href={item.href}
      whileHover={{
        scale: 1.05,
        y: -1
      }}
      className="text-sm font-medium text-secondary-600 hover:text-primary-600 transition-all duration-200 px-3 py-2 rounded-md hover:bg-primary-50"
    >
      {item.name}
    </motion.a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-gray-800">👋 Welcome, {user?.name}</span>
                <motion.button
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 10px 25px rgba(34, 197, 94, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (user?.role === 'student') navigate('/student-dashboard');
                    else if (user?.role === 'teacher') navigate('/teacher-dashboard');
                    else if (user?.role === 'warden') navigate('/warden-dashboard');
                  }}
                  className="btn-primary text-lg font-black"
                >
                  🏠 Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 10px 25px rgba(14, 165, 233, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="btn-secondary text-lg font-black"
                >
                  🚪 Logout
                </motion.button>
              </div>
            ) : (
              <>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    y: -1
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="flex items-center space-x-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-all duration-200 px-3 py-2 rounded-md hover:bg-primary-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register')}
                  className="btn-primary flex items-center space-x-2 text-sm font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Get Started</span>
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      if (user?.role === 'student') navigate('/student-dashboard');
                      else if (user?.role === 'teacher') navigate('/teacher-dashboard');
                      else if (user?.role === 'warden') navigate('/warden-dashboard');
                      setIsOpen(false);
                    }}
                    className="w-full btn-primary"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full btn-secondary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsOpen(false);
                    }}
                    className="w-full btn-secondary"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      navigate('/register');
                      setIsOpen(false);
                    }}
                    className="w-full btn-primary"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
