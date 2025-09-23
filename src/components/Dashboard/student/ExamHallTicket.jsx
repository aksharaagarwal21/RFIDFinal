import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, Clock, MapPin, FileText, Hash } from 'lucide-react';
import { examAPI } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';

const ExamHallTicket = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function load() {
      try {
        const { data } = await examAPI.myTickets({ studentId: user?.id });
        setItems(data.items || []);
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    if (user?.id) load();
  }, [user?.id]);

  const downloadHallTicket = (item) => {
    const exam = item.exam;
    const content = `Hall Ticket\nExam: ${exam.name} (${exam.code})\nDate: ${new Date(exam.date).toLocaleString()}\nRoom: ${exam.room}\nStudent: ${user?.name} (${user?.email})`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hall-ticket-${exam.code}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Exam Hall Tickets</h2>
        <p className="text-gray-600">Download and view your examination hall tickets</p>
      </div>

      {loading ? (
        <div className="card p-6">Loading tickets...</div>
      ) : items.length === 0 ? (
        <div className="card p-6">No tickets found.</div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="card p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-800">{item.exam?.name}</h3>
                        {!item.valid && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">Invalid</span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Hash className="w-4 h-4" />
                          <span>{item.exam?.code}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(item.exam?.date).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Duration: 3 hours</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{item.exam?.room}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={!item.valid} onClick={() => downloadHallTicket(item)} className="btn-primary flex items-center space-x-2 disabled:opacity-50">
                    <Download className="w-4 h-4" />
                    <span>Download Ticket</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamHallTicket;
