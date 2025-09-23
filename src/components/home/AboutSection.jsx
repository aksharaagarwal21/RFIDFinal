import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Shield, Users2 } from 'lucide-react';

const AboutSection = () => {
  const userTypes = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Access attendance records, exam schedules, mess information, and track your academic progress with real-time updates and gamification features.",
      features: ["Real-time Attendance", "Exam Hall Tickets", "Mess Access", "Performance Analytics", "Gamification"],
      color: "from-primary-500 to-primary-600",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop&auto=format"
    },
    {
      icon: BookOpen,
      title: "Teachers",
      description: "Manage classes efficiently with automated attendance tracking, create exams, monitor student performance, and generate comprehensive reports.",
      features: ["Class Management", "Attendance Tracking", "Exam Creation", "Student Analytics", "Report Generation"],
      color: "from-secondary-500 to-secondary-600",
      image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=400&h=300&fit=crop&auto=format"
    },
    {
      icon: Shield,
      title: "Wardens",
      description: "Monitor hostel security, track student movements, manage access permissions, and ensure campus safety with real-time alerts and reporting.",
      features: ["Security Monitoring", "Access Control", "Real-time Tracking", "Safety Alerts", "Hostel Management"],
      color: "from-accent-500 to-accent-600",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop&auto=format"
    },
    {
      icon: Users2,
      title: "Parents",
      description: "Stay connected with your child's academic journey through attendance updates, location tracking, and instant notifications about their campus activities.",
      features: ["Child's Attendance", "Location Updates", "Academic Progress", "Safety Alerts", "Communication"],
      color: "from-primary-600 to-secondary-600",
      image: "https://images.unsplash.com/photo-1609220136736-443140cdeadf?w=400&h=300&fit=crop&auto=format"
    }
  ];

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-72 h-72 bg-gradient-accent rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-secondary rounded-full opacity-10 blur-3xl"
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
      <span className="text-accent-300">🎓 About</span>
      <br />
      <span className="text-white">RFID University System</span>
    </h2>
    <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
      Our <span className="text-accent-300 font-medium">RFID University Management System</span> is a comprehensive solution designed to
      <span className="text-gray-400"> streamline campus operations</span>, enhance security, and improve the educational
      experience for all stakeholders. Built with <span className="text-accent-300">cutting-edge technology</span> and user-centric design.
    </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {userTypes.map((userType, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              className="feature-card group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 4 + index * 0.5, 
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                    className={`w-24 h-24 bg-gradient-to-r ${userType.color} rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300`}
                  >
                    <userType.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  <motion.img 
                    src={userType.image} 
                    alt={userType.title}
                    whileHover={{ scale: 1.05 }}
                    className="w-full h-40 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                  />
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-3xl font-black text-white mb-4 group-hover:text-accent-300 transition-colors duration-300">
                    {userType.title}
                  </h3>
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {userType.description}
                  </p>
                  <div className="space-y-3">
                    {userType.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        whileHover={{ x: 10 }}
                        className="flex items-center space-x-3 group/feature"
                      >
                        <motion.div 
                          className={`w-3 h-3 bg-gradient-to-r ${userType.color} rounded-full group-hover/feature:scale-150 transition-transform duration-300`}
                        ></motion.div>
                        <span className="text-lg font-bold text-gray-300 group-hover/feature:text-accent-300 transition-colors duration-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="text-center bg-gradient-primary rounded-3xl p-16 text-white shadow-3xl relative overflow-hidden"
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl"
          />
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-black mb-8">🎯 Our Mission</h3>
            <p className="text-2xl font-bold max-w-4xl mx-auto leading-relaxed">
              To <span className="text-yellow-300">revolutionize educational institutions</span> by providing intelligent, 
              secure, and user-friendly RFID solutions that enhance safety, 
              streamline operations, and create a more <span className="text-yellow-300">connected campus community</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
