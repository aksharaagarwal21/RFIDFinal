import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import Footer from '../common/Footer';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hide top header on homepage per request; use left sidebar */}
      <div className="flex">
        <aside className="w-60 hidden md:block sticky top-0 h-screen p-6 bg-white/70 backdrop-blur-md border-r border-primary-100">
          <nav className="space-y-3 text-sm">
            <a href="#home" className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md hover:bg-primary-50">Home</a>
            <a href="#about" className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md hover:bg-primary-50">About</a>
            <a href="#features" className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md hover:bg-primary-50">Features</a>
            <a href="#contact" className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md hover:bg-primary-50">Contact</a>
            <a href="#explore" className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md hover:bg-primary-50">Explore</a>
            <a href="/login" className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md hover:bg-primary-50">Login</a>
            <a href="/register" className="block text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md hover:bg-primary-50">Register</a>
          </nav>
        </aside>
        <main className="flex-1 px-4 md:px-10">
          <section id="home">
            <HeroSection />
          </section>
          <section id="features">
            <FeatureSection />
          </section>
          <section id="about">
            <AboutSection />
          </section>
          <section id="contact">
            <ContactSection />
          </section>
        </main>
      </div>
      <Footer />
    </motion.div>
  );
};

export default HomePage;
