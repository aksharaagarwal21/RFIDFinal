import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Users, Download } from 'lucide-react';
import { classAPI, attendanceAPI } from '../../../services/api';

const AttendanceManagement = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0,10));
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function load() {
      const { data } = await classAPI.mine();
      setClasses(data.items || []);
      if (data.items?.length) setSelectedClass(data.items[0]._id);
    }
    load();
  }, []);

  useEffect(() => {
    async function loadStudents() {
      if (!selectedClass) return;
      const { data } = await classAPI.students(selectedClass);
      const list = (data.students || []).map(s => ({ id: s.id, name: s.name, status: 'present' }));
      setStudents(list);
    }
    loadStudents();
  }, [selectedClass]);

  const setStatus = (id, status) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const saveAttendance = async () => {
    const courseCode = classes.find(c => c._id === selectedClass)?.code || 'UNKNOWN';
    await Promise.all(
      students.map(s => attendanceAPI.markAttendance({ studentId: s.id, courseCode, date: selectedDate, status: s.status === 'present' ? 'present' : 'absent' }))
    );
    alert('Attendance saved');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Attendance Management</h2>
        <p className="text-gray-300">Mark and track student attendance</p>
      </div>

      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
            <select value={selectedClass} onChange={(e)=>setSelectedClass(e.target.value)} className="input-field">
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>{cls.code} - {cls.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input type="date" value={selectedDate} onChange={(e)=>setSelectedDate(e.target.value)} className="input-field" />
          </div>
          <div className="flex items-end">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Student List</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Users className="w-4 h-4" />
            <span>{students.length} students</span>
          </div>
        </div>

        <div className="space-y-3">
          {students.map((student, index) => (
            <motion.div key={student.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{student.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{student.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setStatus(student.id, 'present')} className={`w-8 h-8 flex items-center justify-center rounded-full ${student.status==='present'?'bg-green-100':'hover:bg-green-100'}`}>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setStatus(student.id, 'absent')} className={`w-8 h-8 flex items-center justify-center rounded-full ${student.status==='absent'?'bg-red-100':'hover:bg-red-100'}`}>
                  <XCircle className="w-5 h-5 text-red-600" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-300">
            Present: {students.filter(s => s.status === 'present').length} | Absent: {students.filter(s => s.status === 'absent').length}
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={saveAttendance} className="btn-primary">Save Attendance</motion.button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
