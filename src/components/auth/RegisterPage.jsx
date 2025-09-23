import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';
import RoleSelection from './RoleSelection';
import StudentRegistration from './StudentRegistration';
import TeacherRegistration from './TeacherRegistration';
import WardenRegistration from './WardenRegistration';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  // const [formData, setFormData] = useState({});
  
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleFormSubmit = async (userData) => {
    const completeData = {
      ...userData,
      role: selectedRole
    };

    console.log('Submitting registration with data:', completeData);
    const result = await register(completeData);
    console.log('Registration result:', result);
    
    if (result.success) {
      console.log('Registration successful, navigating to dashboard...');
      // Navigate based on role
      if (selectedRole === 'student') {
        navigate('/student-dashboard');
      } else if (selectedRole === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (selectedRole === 'warden') {
        navigate('/warden-dashboard');
      }
    } else {
      console.error('Registration failed:', result.error);
      alert('Registration failed: ' + result.error);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate('/');
    } else {
      setStep(1);
      setSelectedRole('');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Creating your account..." />;
  }

  const renderRegistrationForm = () => {
    switch (selectedRole) {
      case 'student':
        return <StudentRegistration onSubmit={handleFormSubmit} />;
      case 'teacher':
        return <TeacherRegistration onSubmit={handleFormSubmit} />;
      case 'warden':
        return <WardenRegistration onSubmit={handleFormSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleBack}
          className="flex items-center space-x-2 text-accent-300 hover:text-accent-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-300">Join RFID University Management System</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>

          {/* Step Labels */}
          <div className="flex justify-between text-sm text-gray-400 mb-8">
            <span className={step >= 1 ? 'text-accent-300 font-medium' : ''}>Select Role</span>
            <span className={step >= 2 ? 'text-accent-300 font-medium' : ''}>Complete Registration</span>
          </div>

          {/* Step Content */}
          {step === 1 && <RoleSelection onRoleSelect={handleRoleSelect} />}
          {step === 2 && renderRegistrationForm()}

          {/* Links */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
