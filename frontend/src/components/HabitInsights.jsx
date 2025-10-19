import React from 'react';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react';

const HabitInsights = ({ habits }) => {
  // Calculate insights
  const calculateInsights = () => {
    if (!habits || habits.length === 0) {
      return {
        totalHabits: 0,
        activeHabits: 0,
        bestStreak: 0,
        averageCompletion: 0,
        mostConsistent: null
      };
    }

    const totalHabits = habits.length;
    const activeHabits = habits.filter(h => h.currentStreak > 0).length;
    const bestStreak = Math.max(...habits.map(h => h.longestStreak || 0));
    
    // Calculate average completion rate
    const totalCompletions = habits.reduce((sum, h) => sum + (h.completionRate || 0), 0);
    const averageCompletion = totalHabits > 0 ? (totalCompletions / totalHabits).toFixed(1) : 0;
    
    // Find most consistent habit
    const mostConsistent = habits.reduce((best, current) => {
      if (!best) return current;
      return (current.completionRate || 0) > (best.completionRate || 0) ? current : best;
    }, null);

    return {
      totalHabits,
      activeHabits,
      bestStreak,
      averageCompletion,
      mostConsistent
    };
  };

  const insights = calculateInsights();

  const InsightCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-white text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">📊 Habit Insights</h2>
        <p className="text-gray-400">Your habit tracking performance at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <InsightCard
          icon={Target}
          label="Total Habits"
          value={insights.totalHabits}
          color="bg-blue-500/20 text-blue-400"
        />
        <InsightCard
          icon={TrendingUp}
          label="Active Streaks"
          value={insights.activeHabits}
          color="bg-green-500/20 text-green-400"
        />
        <InsightCard
          icon={Award}
          label="Best Streak"
          value={`${insights.bestStreak} days`}
          color="bg-purple-500/20 text-purple-400"
        />
        <InsightCard
          icon={Calendar}
          label="Avg. Completion"
          value={`${insights.averageCompletion}%`}
          color="bg-orange-500/20 text-orange-400"
        />
      </div>

      {insights.mostConsistent && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Most Consistent Habit</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium text-xl">{insights.mostConsistent.name}</p>
              <p className="text-gray-400 text-sm mt-1">
                {insights.mostConsistent.completionRate}% completion rate
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Current Streak</p>
              <p className="text-green-400 font-bold text-2xl">
                {insights.mostConsistent.currentStreak || 0} days
              </p>
            </div>
          </div>
        </div>
      )}

      {insights.totalHabits === 0 && (
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
          <p className="text-gray-400">No habits tracked yet. Start adding habits to see insights!</p>
        </div>
      )}
    </div>
  );
};

export default HabitInsights;