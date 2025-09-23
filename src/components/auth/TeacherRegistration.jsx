import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Phone, Hash, Building, BookOpen } from 'lucide-react';
import Captcha from './Captcha';

const TeacherRegistration = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    teacherId: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    department: '',
    designation: '',
    cabinNumber: '',
    experience: '',
    qualification: '',
    subjects: '',
    emergencyContact: '',
    address: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState({});

  const departments = [
    'Computer Science', 'Electronics and Communication', 'Mechanical Engineering',
    'Civil Engineering', 'Information Technology', 'Electrical Engineering'
  ];

  const designations = [
    'Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'
  ];

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
    if (!formData.teacherId) newErrors.teacherId = 'Teacher ID is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
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
        <h3 className="text-xl font-bold text-white">Teacher Registration</h3>
        <p className="text-gray-300">Complete your faculty profile</p>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
            Teacher ID *
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.teacherId ? 'border-red-500' : ''}`}
              placeholder="e.g., T001"
            />
          </div>
          {errors.teacherId && <p className="text-red-400 text-sm mt-1">{errors.teacherId}</p>}
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="your.email@srm.edu"
            />
          </div>
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
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
      </div>

      {/* Professional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Department *
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`input-field ${errors.department ? 'border-red-500' : ''}`}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <p className="text-red-400 text-sm mt-1">{errors.department}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Designation *
          </label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className={`input-field ${errors.designation ? 'border-red-500' : ''}`}
          >
            <option value="">Select Designation</option>
            {designations.map((designation) => (
              <option key={designation} value={designation}>{designation}</option>
            ))}
          </select>
          {errors.designation && <p className="text-red-400 text-sm mt-1">{errors.designation}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cabin Number
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="cabinNumber"
              value={formData.cabinNumber}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="e.g., C101"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Experience (Years)
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="input-field"
            placeholder="Years of experience"
            min="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Highest Qualification
        </label>
        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g., Ph.D in Computer Science"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subjects/Specialization
        </label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            rows={3}
            className="input-field pl-10 resize-none"
            placeholder="List subjects you teach or your specialization areas"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emergency Contact
        </label>
        <input
          type="tel"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          className="input-field"
          placeholder="Emergency contact number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="input-field resize-none"
          placeholder="Your residential address"
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

      <Captcha onVerify={setCaptchaVerified} />
      {errors.captcha && <p className="text-red-400 text-sm">{errors.captcha}</p>}

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-primary"
      >
        Create Teacher Account
      </motion.button>
    </motion.form>
  );
};

export default TeacherRegistration;
