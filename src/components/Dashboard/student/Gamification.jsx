import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Target, Users, Calendar, TrendingUp, Zap } from 'lucide-react';

const Gamification = () => {
  const [activeTab, setActiveTab] = useState('badges');
  const [userStats] = useState({
    totalPoints: 1250,
    level: 5,
    rank: 18,
    nextLevelPoints: 1500,
    badges: [
      { id: 1, name: 'Perfect Attendance', description: '100% attendance for a week', icon: '🎯', earned: true, points: 100 },
      { id: 2, name: 'Early Bird', description: 'First to enter classroom 5 times', icon: '🌅', earned: true, points: 50 },
      { id: 3, name: 'Library Champion', description: 'Spent 20+ hours in library', icon: '📚', earned: true, points: 75 },
      { id: 4, name: 'Mess Regular', description: 'Never missed a meal for a week', icon: '🍽️', earned: false, points: 30 },
      { id: 5, name: 'Night Owl', description: 'Late study sessions in library', icon: '🦉', earned: false, points: 40 },
      { id: 6, name: 'Social Butterfly', description: 'Active in campus events', icon: '🦋', earned: true, points: 60 }
    ],
    challenges: [
      { 
        id: 1, 
        title: 'Attendance Champion', 
        description: 'Maintain 100% attendance this week',
        progress: 85,
        target: 100,
        reward: 150,
        daysLeft: 2,
        active: true
      },
      { 
        id: 2, 
        title: 'Library Enthusiast', 
        description: 'Spend 15 hours in library this week',
        progress: 12,
        target: 15,
        reward: 100,
        daysLeft: 4,
        active: true
      },
      { 
        id: 3, 
        title: 'Punctuality Master', 
        description: 'Arrive early to 5 consecutive classes',
        progress: 3,
        target: 5,
        reward: 80,
        daysLeft: 3,
        active: true
      }
    ],
    leaderboard: [
      { rank: 1, name: 'Priya Sharma', points: 2100, avatar: '👩‍🎓', department: 'CSE' },
      { rank: 2, name: 'Rajesh Kumar', points: 1980, avatar: '👨‍🎓', department: 'ECE' },
      { rank: 3, name: 'Anita Singh', points: 1850, avatar: '👩‍🎓', department: 'IT' },
      { rank: 4, name: 'Vikram Patel', points: 1720, avatar: '👨‍🎓', department: 'CSE' },
      { rank: 5, name: 'Sneha Reddy', points: 1650, avatar: '👩‍🎓', department: 'ECE' }
    ]
  });

  const progressPercentage = (userStats.totalPoints / userStats.nextLevelPoints) * 100;

  const BadgesTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userStats.badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`card p-6 text-center ${
              badge.earned 
                ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
                : 'bg-gray-50 border-gray-200 opacity-60'
            }`}
          >
            <motion.div
              animate={badge.earned ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl mb-3"
            >
              {badge.icon}
            </motion.div>
            <h3 className={`font-bold mb-2 ${badge.earned ? 'text-gray-800' : 'text-gray-500'}`}>
              {badge.name}
            </h3>
            <p className={`text-sm mb-3 ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
              {badge.description}
            </p>
            <div className={`flex items-center justify-center space-x-1 ${
              badge.earned ? 'text-yellow-600' : 'text-gray-400'
            }`}>
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">{badge.points} pts</span>
            </div>
            {badge.earned && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-2 text-green-600 flex items-center justify-center space-x-1"
              >
                <Award className="w-4 h-4" />
                <span className="text-xs font-medium">Earned!</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const ChallengesTab = () => (
    <div className="space-y-4">
      {userStats.challenges.map((challenge, index) => (
        <motion.div
          key={challenge.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">{challenge.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-blue-600">
                  <Target className="w-4 h-4" />
                  <span>{challenge.progress}/{challenge.target}</span>
                </div>
                <div className="flex items-center space-x-1 text-green-600">
                  <Trophy className="w-4 h-4" />
                  <span>{challenge.reward} pts</span>
                </div>
                <div className="flex items-center space-x-1 text-orange-600">
                  <Calendar className="w-4 h-4" />
                  <span>{challenge.daysLeft} days left</span>
                </div>
              </div>
            </div>
            
            <div className="ml-4 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center relative">
                <span className="text-white font-bold text-lg">
                  {Math.round((challenge.progress / challenge.target) * 100)}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{challenge.progress}/{challenge.target}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="h-2 bg-gradient-primary rounded-full"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const LeaderboardTab = () => (
    <div className="space-y-4">
      {/* Current User Position */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-primary text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Your Current Position</h3>
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">#{userStats.rank}</div>
              <div className="text-sm opacity-90">
                {userStats.totalPoints} points • Level {userStats.level}
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Trophy className="w-12 h-12 opacity-80" />
          </motion.div>
        </div>
      </motion.div>

      {/* Top 5 Leaderboard */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Top Performers
        </h3>
        <div className="space-y-3">
          {userStats.leaderboard.map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-lg ${
                index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-yellow-600' :
                  'bg-gray-300'
                }`}>
                  {index < 3 ? (
                    <Trophy className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{user.rank}</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.department}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">{user.points}</p>
                <p className="text-sm text-gray-500">points</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Gamification Hub</h2>
        <p className="text-gray-600">Track your achievements and compete with peers</p>
      </div>

      {/* User Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-to-br from-purple-500 to-blue-600 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1">Level {userStats.level}</h3>
            <p className="opacity-90">{userStats.totalPoints} / {userStats.nextLevelPoints} points</p>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6" />
            <span className="text-2xl font-bold">{userStats.totalPoints}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to Level {userStats.level + 1}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5 }}
              className="h-2 bg-white rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="card p-6">
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {['badges', 'challenges', 'leaderboard'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'badges' && <BadgesTab />}
        {activeTab === 'challenges' && <ChallengesTab />}
        {activeTab === 'leaderboard' && <LeaderboardTab />}
      </div>
    </div>
  );
};

export default Gamification;
