import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './components/home/HomePage';
import RegisterPage from './components/auth/RegisterPage';
import RoleSelection from './components/auth/RoleSelection';
import StudentRegistration from './components/auth/StudentRegistration';
import TeacherRegistration from './components/auth/TeacherRegistration';
import WardenRegistration from './components/auth/WardenRegistration';
import StudentDashboard from './components/Dashboard/student/StudentDashboard';
import TeacherDashboard from './components/Dashboard/teacher/TeacherDashboard';
import WardenDashboard from './components/Dashboard/warden/WardenDashboard';
import AttendanceView from './components/Dashboard/student/AttendanceView';
import ExamHallTicket from './components/Dashboard/student/ExamHallTicket';
import Gamification from './components/Dashboard/student/Gamification';
import LocationTracking from './components/Dashboard/student/LocationTracking';
import MessAccess from './components/Dashboard/student/MessAccess';
import AttendanceManagement from './components/Dashboard/teacher/AttendanceManagement';
import ClassManagement from './components/Dashboard/teacher/ClassManagement';
import ExamManagement from './components/Dashboard/teacher/ExamManagement';
import HostelManagement from './components/Dashboard/warden/HostelManagement';
import SecurityMonitoring from './components/Dashboard/warden/SecurityMonitoring';
import StudentTracking from './components/Dashboard/warden/StudentTracking';
import ProtectedRoute from './components/common/ProtectedRoute';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
            
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/role-selection" element={<RoleSelection />} />
              <Route path="/student-register" element={<StudentRegistration />} />
              <Route path="/teacher-register" element={<TeacherRegistration />} />
              <Route path="/warden-register" element={<WardenRegistration />} />

              {/* Student Protected Routes */}
              <Route
                path="/student-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/attendance"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <AttendanceView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/exam-ticket"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <ExamHallTicket />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/gamification"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <Gamification />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/location"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <LocationTracking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/mess"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <MessAccess />
                  </ProtectedRoute>
                }
              />

              {/* Teacher Protected Routes */}
              <Route
                path="/teacher-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher/attendance"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <AttendanceManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher/classes"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <ClassManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher/exams"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <ExamManagement />
                  </ProtectedRoute>
                }
              />

              {/* Warden Protected Routes */}
              <Route
                path="/warden-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['warden']}>
                    <WardenDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/warden/hostel"
                element={
                  <ProtectedRoute allowedRoles={['warden']}>
                    <HostelManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/warden/security"
                element={
                  <ProtectedRoute allowedRoles={['warden']}>
                    <SecurityMonitoring />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/warden/tracking"
                element={
                  <ProtectedRoute allowedRoles={['warden']}>
                    <StudentTracking />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

