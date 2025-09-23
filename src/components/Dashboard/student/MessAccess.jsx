import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingDown, TrendingUp, Calendar, Coffee, Utensils, Clock } from 'lucide-react';

const MessAccess = () => {
  const [messData] = useState({
    balance: 2500,
    todaySpent: 85,
    weeklySpent: 420,
    monthlyBudget: 2000,
    recentTransactions: [
      { id: 1, type: 'Breakfast', amount: 25, time: '08:30 AM', date: '2025-09-22', items: ['Idli', 'Sambar', 'Chutney', 'Coffee'] },
      { id: 2, type: 'Lunch', amount: 45, time: '01:15 PM', date: '2025-09-22', items: ['Rice', 'Dal', 'Vegetables', 'Curd'] },
      { id: 3, type: 'Snacks', amount: 15, time: '04:00 PM', date: '2025-09-21', items: ['Tea', 'Biscuits'] },
      { id: 4, type: 'Dinner', amount: 50, time: '08:30 PM', date: '2025-09-21', items: ['Roti', 'Curry', 'Rice', 'Sweet'] }
    ]
  });

  const getMealIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'breakfast':
        return <Coffee className="w-5 h-5" />;
      case 'lunch':
      case 'dinner':
        return <Utensils className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getMealColor = (type) => {
    switch (type.toLowerCase()) {
      case 'breakfast':
        return 'bg-yellow-100 text-yellow-800';
      case 'lunch':
        return 'bg-green-100 text-green-800';
      case 'dinner':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Mess Access & Balance</h2>
        <p className="text-gray-600">Track your mess transactions and balance</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-6 bg-gradient-primary text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Current Balance</p>
              <p className="text-2xl font-bold">₹{messData.balance}</p>
            </div>
            <CreditCard className="w-8 h-8 opacity-80" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Today's Spending</p>
              <p className="text-2xl font-bold text-gray-800">₹{messData.todaySpent}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Weekly Spending</p>
              <p className="text-2xl font-bold text-gray-800">₹{messData.weeklySpent}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Budget</p>
              <p className="text-2xl font-bold text-gray-800">₹{messData.monthlyBudget}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {messData.recentTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getMealColor(transaction.type)}`}>
                  {getMealIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{transaction.type}</p>
                  <p className="text-sm text-gray-600">{transaction.date} • {transaction.time}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {transaction.items.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                    {transaction.items.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{transaction.items.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">₹{transaction.amount}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="card p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Recharge Balance</h4>
              <p className="text-sm text-gray-600">Add money to your mess account</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="card p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">View Menu</h4>
              <p className="text-sm text-gray-600">Check today's mess menu</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="card p-6 text-left hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Spending Report</h4>
              <p className="text-sm text-gray-600">Detailed analysis of expenses</p>
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default MessAccess;
