import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const roleAuthAPI = {
  studentRegister: (payload) => api.post('/auth/roles/student/register', payload),
  teacherRegister: (payload) => api.post('/auth/roles/teacher/register', payload),
  wardenRegister: (payload) => api.post('/auth/roles/warden/register', payload),
  parentRegister: (payload) => api.post('/auth/roles/parent/register', payload),
  studentLogin: (payload) => api.post('/auth/roles/student/login', payload),
  teacherLogin: (payload) => api.post('/auth/roles/teacher/login', payload),
  wardenLogin: (payload) => api.post('/auth/roles/warden/login', payload),
  parentLogin: (payload) => api.post('/auth/roles/parent/login', payload),
};

export const dashboardAPI = {
  getStudentDashboard: () => api.get('/dashboard/student'),
  getTeacherDashboard: () => api.get('/dashboard/teacher'),
  getWardenDashboard: () => api.get('/dashboard/warden'),
};

export const attendanceAPI = {
  getAttendance: (params) => api.get('/attendance', { params }),
  markAttendance: (data) => api.post('/attendance/mark', data),
  getStats: (params) => api.get('/attendance/stats', { params }),
};

export const scanAPI = {
  ingest: (data) => api.post('/scans/ingest', data),
  recent: (params) => api.get('/scans/recent', { params }),
};

export const classAPI = {
  create: (data) => api.post('/classes', data),
  mine: () => api.get('/classes/mine'),
  enroll: (classId, data) => api.post(`/classes/${classId}/enroll`, data),
  students: (classId) => api.get(`/classes/${classId}/students`),
  attendanceSummary: (classId) => api.get(`/classes/${classId}/attendance/summary`),
};

export const messAPI = {
  getAccess: (userId) => api.get(`/mess/access/${userId || ''}`),
  toggleAccess: (data) => api.post('/mess/access/toggle', data),
};

export const hostelAPI = {
  log: (data) => api.post('/hostel/log', data),
  logs: (params) => api.get('/hostel/logs', { params }),
};

export const examAPI = {
  create: (data) => api.post('/exams', data),
  ticket: (data) => api.post('/exams/ticket', data),
  verify: (data) => api.post('/exams/verify', data),
  myTickets: (params) => api.get('/exams/my-tickets', { params }),
};

export const locationAPI = {
  report: (data) => api.post('/location/report', data),
  last: (params) => api.get('/location/last', { params }),
  history: (params) => api.get('/location/history', { params }),
};

export default api;
