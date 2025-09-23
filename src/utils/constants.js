export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  WARDEN: 'warden',
  PARENT: 'parent',
  ADMIN: 'admin'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  STUDENT_DASHBOARD: '/student-dashboard',
  TEACHER_DASHBOARD: '/teacher-dashboard',
  WARDEN_DASHBOARD: '/warden-dashboard'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/me'
  },
  DASHBOARD: {
    STUDENT: '/dashboard/student',
    TEACHER: '/dashboard/teacher',
    WARDEN: '/dashboard/warden'
  }
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme'
};
