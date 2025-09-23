import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, roleAuthAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password, role) => {
    setLoading(true);
    try {
      let data;
      if (role === 'student') ({ data } = await roleAuthAPI.studentLogin({ email, password }));
      else if (role === 'teacher') ({ data } = await roleAuthAPI.teacherLogin({ email, password }));
      else if (role === 'warden') ({ data } = await roleAuthAPI.wardenLogin({ email, password }));
      else if (role === 'parent') ({ data } = await roleAuthAPI.parentLogin({ email, password }));
      else ({ data } = await authAPI.login({ email, password, role }));

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const role = payload.role;
      let response;
      if (role === 'student') {
        response = await roleAuthAPI.studentRegister({ 
          name: payload.name, 
          email: payload.email, 
          password: payload.password, 
          profile: {
            registrationNumber: payload.regNumber, 
            department: payload.department || 'CSE', 
            year: payload.class, 
            className: payload.class, 
            section: payload.section, 
            hostel: payload.hostel, 
            roomNumber: payload.roomNumber, 
            personalEmail: payload.email, 
            collegeEmail: payload.collegeEmail, 
            contactNumber: payload.phone 
          } 
        });
      } else if (role === 'teacher') {
        response = await roleAuthAPI.teacherRegister({ 
          name: payload.name, 
          email: payload.email, 
          password: payload.password, 
          profile: { 
            teacherId: payload.teacherId, 
            department: payload.department || 'CSE', 
            cabinNumber: payload.cabinNumber, 
            contactNumber: payload.phone 
          } 
        });
      } else if (role === 'warden') {
        response = await roleAuthAPI.wardenRegister({ 
          name: payload.name, 
          email: payload.email, 
          password: payload.password, 
          profile: { 
            hostel: payload.hostel, 
            floorIncharge: payload.floorIncharge, 
            contactNumber: payload.phone 
          } 
        });
      } else if (role === 'parent') {
        response = await roleAuthAPI.parentRegister({ 
          name: payload.name, 
          email: payload.email, 
          password: payload.password, 
          profile: { 
            childStudentId: payload.childStudentId, 
            contactNumber: payload.phone, 
            address: payload.address 
          } 
        });
      } else {
        response = await authAPI.register(payload);
      }

      const data = response.data;
      console.log('Registration response:', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      setLoading(false);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = { user, loading, isAuthenticated, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
