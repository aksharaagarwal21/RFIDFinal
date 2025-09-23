# 🎓 RFID University Management System

Complete full-stack application for university management using RFID technology for real-time tracking, attendance monitoring, and comprehensive student services.

## 📁 Project Structure


## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication
- Role-based access control (Student, Teacher, Warden, Parent)
- Secure password hashing with bcrypt
- Rate limiting and CORS protection

### 📡 RFID Integration
- Real-time RFID card scanning
- Location tracking (Gates, Classrooms, Library, Mess)
- Automated attendance marking
- Entry/Exit logging with timestamps

### 📊 Dashboard Systems
- **Student Dashboard:** Attendance stats, upcoming exams, mess logs, gamification
- **Teacher Dashboard:** Class management, attendance tracking, exam creation
- **Warden Dashboard:** Security monitoring, hostel management, real-time alerts

### 📚 Academic Management
- Automated attendance tracking with RFID
- Exam scheduling and result management
- Class timetable integration
- Performance analytics and reports

### 🍽️ Mess Management
- RFID-based meal tracking
- Cost monitoring and budgeting
- Meal recommendations based on patterns
- Payment integration

### 🛡️ Security & Monitoring
- Automated security alerts for unusual activities
- Real-time location monitoring
- Late night exit warnings
- Suspicious activity detection

### 🎮 Gamification
- Points system for various activities
- Achievement badges and rewards
- Leaderboards (Overall, Department, Year-wise)
- Streak tracking for attendance and activities

### 📱 Real-time Features
- Live location updates via Socket.IO
- Instant notifications
- Real-time dashboard updates
- Push notifications for important events

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT + bcrypt
- **Real-time:** Socket.IO
- **Validation:** express-validator
- **Security:** helmet, cors, express-rate-limit
- **File Upload:** multer
- **Email:** nodemailer

### Frontend
- **Framework:** React.js 18+
- **Routing:** React Router v6
- **State Management:** Context API + useReducer
- **Styling:** CSS3 with CSS Variables
- **HTTP Client:** Axios
- **Real-time:** Socket.IO Client
- **Icons:** React Icons
- **Charts:** Chart.js (for analytics)

### Database Schema
- **Users:** Students, Teachers, Wardens, Parents
- **RFID Logs:** All scan activities with timestamps
- **Attendance:** Class-wise attendance records
- **Classes:** Subject and schedule management
- **Exams:** Examination management
- **Mess Logs:** Meal tracking and payments
- **Security Alerts:** Automated security monitoring
- **Gamification:** Points, badges, achievements
- **Notifications:** In-app notification system

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB 6.0+
- Git

### Installation

1. **Clone the repository**

2. **Setup Backend**

3. **Setup Frontend**

4. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/api

## 📖 API Documentation

### Base URL: `http://localhost:5000/api`

#### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user profile
- `PUT /auth/profile` - Update user profile
- `PUT /auth/password` - Change password

#### Dashboard Endpoints
- `GET /dashboard/student` - Student dashboard data
- `GET /dashboard/teacher` - Teacher dashboard data
- `GET /dashboard/warden` - Warden dashboard data

#### RFID Operations
- `POST /rfid/scan` - Process RFID card scan
- `GET /rfid/logs` - Get scan history
- `GET /rfid/location-history/:userId` - User location history

#### Attendance Management
- `POST /attendance/mark` - Manual attendance marking
- `GET /attendance` - Get attendance records
- `GET /attendance/stats` - Attendance statistics
- `GET /attendance/report` - Generate attendance report

#### Exam Management
- `POST /exam` - Create new exam
- `GET /exam` - Get exams list
- `GET /exam/:id` - Get exam details
- `POST /exam/:id/results` - Add exam results
- `PUT /exam/:id/publish` - Publish exam results

### Demo Credentials

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
