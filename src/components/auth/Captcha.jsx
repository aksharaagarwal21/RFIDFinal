import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Check, X } from 'lucide-react';

const Captcha = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showError, setShowError] = useState(false);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    setIsVerified(false);
    setShowError(false);
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const verifyCaptcha = () => {
    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      setIsVerified(true);
      setShowError(false);
      onVerify(true);
    } else {
      setShowError(true);
      setIsVerified(false);
      onVerify(false);
      setTimeout(() => {
        generateCaptcha();
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      verifyCaptcha();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Verification Code
      </label>
      
      {/* Captcha Display */}
      <div className="flex items-center space-x-3">
        <motion.div
          key={captchaText}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-primary-100 to-secondary-100 p-4 rounded-lg border-2 border-dashed border-primary-300 select-none"
        >
          <span className="text-xl font-bold text-gray-800 tracking-wider" style={{
            fontFamily: 'monospace',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            {captchaText}
          </span>
        </motion.div>
        
        <motion.button
          type="button"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={generateCaptcha}
          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
          title="Refresh Captcha"
        >
          <RefreshCw className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>

      {/* Input Field */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`input-field pr-10 ${
              isVerified 
                ? 'border-green-500 bg-green-50' 
                : showError 
                ? 'border-red-500 bg-red-50' 
                : ''
            }`}
            placeholder="Enter the code above"
            disabled={isVerified}
          />
          
          {/* Status Icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isVerified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
            {showError && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </div>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={verifyCaptcha}
          disabled={!userInput || isVerified}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isVerified
              ? 'bg-green-500 text-white cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
          }`}
        >
          {isVerified ? 'Verified' : 'Verify'}
        </motion.button>
      </div>

      {/* Status Messages */}
      {isVerified && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 text-sm flex items-center space-x-1"
        >
          <Check className="w-4 h-4" />
          <span>Verification successful!</span>
        </motion.p>
      )}
      
      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-sm flex items-center space-x-1"
        >
          <X className="w-4 h-4" />
          <span>Incorrect code. Generating new one...</span>
        </motion.p>
      )}
    </div>
  );
};

export default Captcha;
