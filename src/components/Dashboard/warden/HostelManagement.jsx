import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Plus, AlertCircle } from 'lucide-react';
import { hostelAPI, messAPI } from '../../../services/api';

const HostelManagement = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [messAllowed, setMessAllowed] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await hostelAPI.logs({});
        setLogs(data.items || []);
      } catch (e) {
        setLogs([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const fetchMess = async () => {
    if (!userId) return;
    const { data } = await messAPI.getAccess(userId);
    setMessAllowed(!!data.access?.allowed);
  };

  const toggleMess = async () => {
    if (!userId) return;
    const next = !messAllowed;
    await messAPI.toggleAccess({ userId, allowed: next });
    setMessAllowed(next);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Hostel Management</h2>
        <p className="text-gray-600">Logs and mess access controls</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Logs</p>
              <p className="text-2xl font-bold text-gray-800">{logs.length}</p>
            </div>
            <Home className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Unique Students</p>
              <p className="text-2xl font-bold text-gray-800">{new Set(logs.map(l=>l.userId)).size}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Gates</p>
              <p className="text-2xl font-bold text-gray-800">{new Set(logs.map(l=>l.gate).filter(Boolean)).size}</p>
            </div>
            <Plus className="w-8 h-8 text-orange-600" />
          </div>
        </motion.div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Hostel Logs</h3>
        {loading ? (
          <div>Loading logs...</div>
        ) : (
          <div className="space-y-3">
            {logs.slice(0, 20).map((log) => (
              <div key={log._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className={`w-5 h-5 ${log.direction === 'in' ? 'text-green-600' : 'text-red-600'}`} />
                  <div>
                    <p className="font-semibold text-gray-800">{log.direction.toUpperCase()}</p>
                    <p className="text-sm text-gray-600">{log.gate || 'Unknown gate'} • {new Date(log.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{log.userId}</span>
              </div>
            ))}
            {logs.length === 0 && <div className="text-sm text-gray-600">No logs yet.</div>}
          </div>
        )}
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Mess Access Control</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Student UserId" value={userId} onChange={(e)=>setUserId(e.target.value)} className="input-field" />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={fetchMess} className="btn-secondary">Fetch Status</motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleMess} disabled={messAllowed===null} className="btn-primary disabled:opacity-50">
            {messAllowed ? 'Disable Access' : 'Enable Access'}
          </motion.button>
        </div>
        {messAllowed!==null && (
          <p className="mt-3 text-sm text-gray-700">Current status: <span className={`font-semibold ${messAllowed?'text-green-600':'text-red-600'}`}>{messAllowed? 'Allowed' : 'Blocked'}</span></p>
        )}
      </div>
    </div>
  );
};

export default HostelManagement;
