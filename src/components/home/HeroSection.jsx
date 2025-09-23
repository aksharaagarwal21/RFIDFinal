import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Users, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 text-center relative z-10"
      >
        {/* RFID Logo */}
        <motion.div
          variants={itemVariants}
          className="mb-12 flex justify-center"
        >
          <div className="w-20 h-20 bg-gradient-accent rounded-lg flex items-center justify-center shadow-lg">
            <Zap className="w-10 h-10 text-white" />
          </div>
        </motion.div>

    <motion.h1
      variants={itemVariants}
      className="hero-title mb-6 text-center"
    >
      <span className="text-white">RFID University</span>
      <br />
      <span className="text-accent-300">Management System</span>
    </motion.h1>

    <motion.p
      variants={itemVariants}
      className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed text-center"
    >
      <span className="text-accent-300 font-medium">Revolutionizing education</span> with cutting-edge RFID technology.
      <br />
      <span className="text-gray-400">Track attendance, manage access, and enhance campus security with our intelligent system.</span>
    </motion.p>

        {/* Feature Highlights */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto"
        >
          {[
            { icon: Zap, label: "Real-time Tracking" },
            { icon: Shield, label: "Enhanced Security" },
            { icon: Users, label: "User Management" },
            { icon: TrendingUp, label: "Analytics" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="feature-card"
            >
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-300">{feature.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/register')}
            className="btn-primary text-lg px-8 py-4 font-medium"
          >
            Get Started Today
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="btn-secondary text-lg px-8 py-4 font-medium"
          >
            Sign In
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="mt-8 grid grid-cols-3 gap-12 max-w-4xl mx-auto"
        >
          {[
            { number: "10K+", label: "Active Students", icon: "👥" },
            { number: "500+", label: "Faculty Members", icon: "👨‍🏫" },
            { number: "99.9%", label: "Uptime", icon: "⚡" }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="stats-number">{stat.number}</div>
              <div className="stats-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
