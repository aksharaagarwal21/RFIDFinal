RFID University Backend API

Tech stack: Express, MongoDB (Mongoose), JWT, Joi, Helmet, CORS, Morgan

1) Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

2) Configuration
Create a .env file in backend/ with:

PORT=5000
MONGO_URI=mongodb://localhost:27017/rfid_university
JWT_SECRET=replace-with-a-very-strong-secret
CORS_ORIGIN=http://localhost:3000

Adjust MONGO_URI for your environment (e.g., Atlas connection string) and CORS_ORIGIN for your frontend URL.

3) Install & Run (Windows PowerShell)
cd backend
npm install
npm run dev

Server starts on http://localhost:5000
Health check: GET /api/health

4) Frontend integration
Set frontend to call the backend base URL:
- Option A: Environment variable in frontend: REACT_APP_API_URL=http://localhost:5000/api
- Option B: It defaults to http://localhost:5000/api already (see frontend/src/services/api.js)

5) API Overview
Base URL: /api

Auth
POST   /auth/register    { name, email, password, role: student|teacher|warden }
POST   /auth/login       { email, password, role }
GET    /auth/me          (Bearer token)
PUT    /auth/profile     { name } (Bearer token)

Dashboard (Bearer token)
GET /dashboard/student   (role: student)
GET /dashboard/teacher   (role: teacher)
GET /dashboard/warden    (role: warden)

Attendance (Bearer token)
GET  /attendance         ?studentId=&courseCode=&from=&to=
POST /attendance/mark    { studentId, courseCode, date, status } (role: teacher)
GET  /attendance/stats   ?studentId=&courseCode=

6) Data models
User: { name, email, passwordHash, role }
Attendance: { studentId, courseCode, date, status, markedBy }

7) Notes
- Passwords are hashed with bcrypt.
- JWT expires in 7 days. Provide token as Authorization: Bearer <token>.
- Unique index prevents duplicate attendance for same student/course/date.
- Extend models and routes as needed for your domain.
