import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
          className="absolute top-20 left-20 w-80 h-80 bg-gradient-accent rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-secondary rounded-full opacity-10 blur-3xl"
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
      <span className="text-accent-300">📞 Get In</span>
      <br />
      <span className="text-white">Touch</span>
    </h2>
    <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
      Ready to <span className="text-accent-300 font-medium">transform your educational institution</span>?
      Contact us today to learn more about our <span className="text-gray-400">RFID solutions</span>.
    </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="feature-card">
              <h3 className="text-3xl font-black text-white mb-8">📋 Contact Information</h3>
              
              <div className="space-y-8">
                <motion.div 
                  whileHover={{ 
                    scale: 1.05,
                    x: 10
                  }}
                  className="flex items-center space-x-6 group"
                >
                  <motion.div 
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: 0
                    }}
                    className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                  >
                    <Mail className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-xl font-black text-white group-hover:text-accent-300 transition-colors duration-300">📧 Email</p>
                    <p className="text-lg text-gray-300 group-hover:text-gray-200 transition-colors duration-300">contact@rfiduniversity.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ 
                    scale: 1.05,
                    x: 10
                  }}
                  className="flex items-center space-x-6 group"
                >
                  <motion.div 
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: 0.5
                    }}
                    className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                  >
                    <Phone className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-xl font-black text-white group-hover:text-accent-300 transition-colors duration-300">📱 Phone</p>
                    <p className="text-lg text-gray-300 group-hover:text-gray-200 transition-colors duration-300">+91 98765 43210</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ 
                    scale: 1.05,
                    x: 10
                  }}
                  className="flex items-center space-x-6 group"
                >
                  <motion.div 
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: 1
                    }}
                    className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                  >
                    <MapPin className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-xl font-black text-white group-hover:text-accent-300 transition-colors duration-300">📍 Address</p>
                    <p className="text-lg text-gray-300 group-hover:text-gray-200 transition-colors duration-300">SRM University, Chennai, Tamil Nadu</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="feature-card bg-gradient-primary text-white relative overflow-hidden"
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
                className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
              />
              <div className="relative z-10">
                <h4 className="text-2xl font-black mb-6">⭐ Why Choose Us?</h4>
                <ul className="space-y-4">
                  {[
                    "24/7 Technical Support",
                    "Easy Integration", 
                    "Scalable Solutions",
                    "Comprehensive Training"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-3 group/feature"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.5 }}
                        className="w-3 h-3 bg-yellow-300 rounded-full group-hover/feature:bg-white transition-colors duration-300"
                      ></motion.div>
                      <span className="text-lg font-bold group-hover/feature:text-yellow-300 transition-colors duration-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="feature-card"
          >
            <h3 className="text-3xl font-black text-white mb-8">💬 Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3">
                  👤 Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field text-lg"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3">
                  📧 Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field text-lg"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3">
                  📝 Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field text-lg"
                  placeholder="What is this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-300 mb-3">
                  💭 Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="input-field resize-none text-lg"
                  placeholder="Tell us more about your requirements..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full btn-primary flex items-center justify-center space-x-3 text-xl font-black py-6"
              >
                <Send className="w-6 h-6" />
                <span>🚀 Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
