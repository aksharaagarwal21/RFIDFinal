import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Phone, Hash, Building, Shield } from 'lucide-react';
import Captcha from './Captcha';

const WardenRegistration = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    wardenId: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    hostel: '',
    floorIncharge: '',
    officeRoom: '',
    emergencyContact: '',
    experience: '',
    qualification: '',
    address: '',
    alternatePhone: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState({});

  const hostels = ['Boys Hostel 1', 'Boys Hostel 2', 'Girls Hostel 1', 'Girls Hostel 2'];
  const floors = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', 'All Floors'];

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
    if (!formData.wardenId) newErrors.wardenId = 'Warden ID is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.hostel) newErrors.hostel = 'Hostel is required';
    if (!formData.floorIncharge) newErrors.floorIncharge = 'Floor responsibility is required';
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
        <h3 className="text-xl font-bold text-white">Warden Registration</h3>
        <p className="text-gray-300">Complete your warden profile</p>
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
            Warden ID *
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="wardenId"
              value={formData.wardenId}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.wardenId ? 'border-red-500' : ''}`}
              placeholder="e.g., W001"
            />
          </div>
          {errors.wardenId && <p className="text-red-400 text-sm mt-1">{errors.wardenId}</p>}
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alternate Phone Number
        </label>
        <input
          type="tel"
          name="alternatePhone"
          value={formData.alternatePhone}
          onChange={handleChange}
          className="input-field"
          placeholder="Alternate contact number"
        />
      </div>

      {/* Hostel Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Assigned Hostel *
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
            Floor Responsibility *
          </label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              name="floorIncharge"
              value={formData.floorIncharge}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.floorIncharge ? 'border-red-500' : ''}`}
            >
              <option value="">Select Floor</option>
              {floors.map((floor) => (
                <option key={floor} value={floor}>{floor}</option>
              ))}
            </select>
          </div>
          {errors.floorIncharge && <p className="text-red-400 text-sm mt-1">{errors.floorIncharge}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Office Room Number
        </label>
        <input
          type="text"
          name="officeRoom"
          value={formData.officeRoom}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g., W101"
        />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Qualification
          </label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="input-field"
            placeholder="Educational qualification"
          />
        </div>
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
        Create Warden Account
      </motion.button>
    </motion.form>
  );
};

export default WardenRegistration;
