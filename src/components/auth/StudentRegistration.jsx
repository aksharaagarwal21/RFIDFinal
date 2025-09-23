import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Phone, Hash, Building, Home } from 'lucide-react';
import Captcha from './Captcha';

const StudentRegistration = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    regNumber: '',
    email: '',
    collegeEmail: '',
    phone: '',
    password: '',
    confirmPassword: '',
    class: '',
    section: '',
    hostel: '',
    roomNumber: '',
    parentName: '',
    parentPhone: '',
    address: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState({});

  const hostels = ['Boys Hostel 1', 'Boys Hostel 2', 'Girls Hostel 1', 'Girls Hostel 2'];
  const classes = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const sections = ['A', 'B', 'C', 'D'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.regNumber) newErrors.regNumber = 'Registration number is required';
    if (!formData.email) newErrors.email = 'Personal email is required';
    if (!formData.collegeEmail) newErrors.collegeEmail = 'College email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.class) newErrors.class = 'Class is required';
    if (!formData.section) newErrors.section = 'Section is required';
    if (!formData.hostel) newErrors.hostel = 'Hostel is required';
    if (!formData.roomNumber) newErrors.roomNumber = 'Room number is required';
    if (!captchaVerified) newErrors.captcha = 'Please complete captcha verification';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white">Student Registration</h3>
        <p className="text-gray-300">Complete your student profile</p>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Registration Number *
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              name="regNumber"
              value={formData.regNumber}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.regNumber ? 'border-red-500' : ''}`}
              placeholder="e.g., RA21CSE001"
            />
          </div>
          {errors.regNumber && <p className="text-red-400 text-sm mt-1">{errors.regNumber}</p>}
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Personal Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="your.email@gmail.com"
            />
          </div>
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            College Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="collegeEmail"
              value={formData.collegeEmail}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.collegeEmail ? 'border-red-500' : ''}`}
              placeholder="your.name@srm.edu"
            />
          </div>
          {errors.collegeEmail && <p className="text-red-400 text-sm mt-1">{errors.collegeEmail}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`input-field pl-10 ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="+91 98765 43210"
          />
        </div>
        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Academic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Class *
          </label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className={`input-field ${errors.class ? 'border-red-500' : ''}`}
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          {errors.class && <p className="text-red-400 text-sm mt-1">{errors.class}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Section *
          </label>
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className={`input-field ${errors.section ? 'border-red-500' : ''}`}
          >
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
          {errors.section && <p className="text-red-400 text-sm mt-1">{errors.section}</p>}
        </div>
      </div>

      {/* Hostel Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Hostel *
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              name="hostel"
              value={formData.hostel}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.hostel ? 'border-red-500' : ''}`}
            >
              <option value="">Select Hostel</option>
              {hostels.map((hostel) => (
                <option key={hostel} value={hostel}>{hostel}</option>
              ))}
            </select>
          </div>
          {errors.hostel && <p className="text-red-400 text-sm mt-1">{errors.hostel}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Room Number *
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.roomNumber ? 'border-red-500' : ''}`}
              placeholder="e.g., 101A"
            />
          </div>
          {errors.roomNumber && <p className="text-red-400 text-sm mt-1">{errors.roomNumber}</p>}
        </div>
      </div>

      {/* Parent Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Parent/Guardian Name
          </label>
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            className="input-field"
            placeholder="Parent/Guardian name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Parent Phone Number
          </label>
          <input
            type="tel"
            name="parentPhone"
            value={formData.parentPhone}
            onChange={handleChange}
            className="input-field"
            placeholder="Parent phone number"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="input-field resize-none"
          placeholder="Your home address"
        />
      </div>

      {/* Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field pr-10 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input-field pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
      </div>

      {/* Captcha */}
      <Captcha onVerify={setCaptchaVerified} />
      {errors.captcha && <p className="text-red-400 text-sm">{errors.captcha}</p>}

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-primary"
      >
        Create Student Account
      </motion.button>
    </motion.form>
  );
};

export default StudentRegistration;
