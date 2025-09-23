import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Plus } from 'lucide-react';
import { classAPI } from '../../../services/api';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', section: '' });
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await classAPI.mine();
        setClasses(data.items || []);
      } catch (e) {
        setClasses([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const createClass = async () => {
    if (!form.name || !form.code) return;
    const { data } = await classAPI.create({ name: form.name, code: form.code, section: form.section });
    setClasses([data.class, ...classes]);
    setShowCreate(false);
    setForm({ name: '', code: '', section: '' });
  };

  const openDetails = async (cls) => {
    setSelectedClass(cls);
    try {
      const [studentsRes, summaryRes] = await Promise.all([
        classAPI.students(cls._id),
        classAPI.attendanceSummary(cls._id)
      ]);
      setStudents(studentsRes.data.students || []);
      setSummary(summaryRes.data.stats || []);
    } catch (e) {
      setStudents([]);
      setSummary([]);
    }
  };

  if (loading) return <div className="card p-6">Loading classes...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">My Classes</h2>
          <p className="text-gray-300">Manage your class schedules and student enrollment</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCreate(true)} className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Class</span>
        </motion.button>
      </div>

      {showCreate && (
        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="input-field" />
            <input placeholder="Code" value={form.code} onChange={(e)=>setForm({...form,code:e.target.value})} className="input-field" />
            <input placeholder="Section" value={form.section} onChange={(e)=>setForm({...form,section:e.target.value})} className="input-field" />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={createClass} className="btn-secondary">Create</motion.button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classes.map((cls, index) => (
          <motion.div key={cls._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{cls.name}</h3>
                <p className="text-gray-300 mb-3">{cls.code} {cls.section ? `• ${cls.section}` : ''}</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
                  <BookOpen className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Users className="w-4 h-4" />
                <span>View students</span>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => openDetails(cls)} className="btn-secondary text-sm">Open</motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedClass && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">{selectedClass.name} • {selectedClass.code}</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Students</h4>
              <div className="space-y-2">
                {students.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="font-medium text-white">{s.name}</span>
                    <span className="text-sm text-gray-300">{s.email}</span>
                  </div>
                ))}
                {students.length === 0 && <div className="text-sm text-gray-300">No students enrolled.</div>}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Attendance Summary</h4>
              <div className="space-y-2">
                {summary.map((row) => (
                  <div key={row.studentId} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm text-gray-300">{row.studentId}</span>
                    <span className="font-medium text-white">{row.percentage}%</span>
                  </div>
                ))}
                {summary.length === 0 && <div className="text-sm text-gray-300">No attendance yet.</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;
