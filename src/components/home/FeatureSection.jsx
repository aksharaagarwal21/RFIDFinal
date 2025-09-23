import React from 'react';
import { motion } from 'framer-motion';
import { 
  Fingerprint, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  Users,
  Smartphone,
  Zap
} from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: Fingerprint,
      title: "RFID Authentication",
      description: "Secure access control using advanced RFID technology for seamless campus navigation.",
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: MapPin,
      title: "Real-time Location",
      description: "Track student and staff movements across campus with precision location monitoring.",
      color: "from-secondary-500 to-secondary-600"
    },
    {
      icon: Clock,
      title: "Automated Attendance",
      description: "Eliminate manual attendance with automatic tracking when entering classrooms.",
      color: "from-accent-500 to-accent-600"
    },
    {
      icon: ShieldCheck,
      title: "Enhanced Security",
      description: "Multi-layer security system with instant alerts and comprehensive access control.",
      color: "from-primary-600 to-primary-700"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Detailed reports and insights on attendance patterns and campus utilization.",
      color: "from-secondary-600 to-secondary-700"
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Comprehensive dashboards for students, teachers, wardens, and administrators.",
      color: "from-accent-600 to-accent-700"
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "Access all features from any device with our responsive web application.",
      color: "from-primary-700 to-primary-800"
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Real-time alerts for important events, emergencies, and system updates.",
      color: "from-secondary-700 to-secondary-800"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-primary rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-secondary rounded-full opacity-10 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
    <h2 className="section-title">
      <span className="text-accent-300">🚀 Powerful Features</span>
      <br />
      <span className="text-white">for Modern Education</span>
    </h2>
    <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
      Our comprehensive <span className="text-accent-300 font-medium">RFID system</span> provides everything you need to manage
      your educational institution <span className="text-gray-400">efficiently and securely</span>.
    </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1,
                rotateY: 10,
                z: 50,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="feature-card group cursor-pointer h-full"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3 + index * 0.5, 
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2
                }}
                className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300`}
              >
                <feature.icon className="w-10 h-10 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-300 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-lg font-medium text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
