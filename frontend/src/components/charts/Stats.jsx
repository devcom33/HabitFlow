import { CheckCircle, ChartBar, List, Flame } from "phosphor-react";

const Stats = ({ habitCompletions, habitData }) => {
  const today = new Date().toISOString().split("T")[0];
  const completed = habitData[today] || 0;
  const total = habitCompletions.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const calculateStreak = () => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateKey = currentDate.toISOString().split("T")[0];
      if ((habitData[dateKey] || 0) > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto">
      {/* Today's Progress Card */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 p-6">
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-full -mr-12 -mt-12 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="relative flex items-start gap-4">
          <div className="flex-shrink-0 p-3 bg-green-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <CheckCircle weight="duotone" className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {completed}
              <span className="text-xl text-gray-400">/{total}</span>
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Today's Progress
            </div>
          </div>
        </div>
      </div>

      {/* Completion Rate Card */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 p-6">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="relative flex items-start gap-4">
          <div className="flex-shrink-0 p-3 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <ChartBar weight="duotone" className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {percent}
              <span className="text-xl">%</span>
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Completion Rate
            </div>
          </div>
        </div>
      </div>

      {/* Total Habits Card */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 p-6">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -mr-12 -mt-12 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="relative flex items-start gap-4">
          <div className="flex-shrink-0 p-3 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <List weight="duotone" className="w-8 h-8 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {total}
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Total Habits
            </div>
          </div>
        </div>
      </div>

      {/* Current Streak Card */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 p-6">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-100 rounded-full -mr-12 -mt-12 opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="relative flex items-start gap-4">
          <div className="flex-shrink-0 p-3 bg-red-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <Flame weight="duotone" className="w-8 h-8 text-red-600" />
          </div>
          <div className="flex-1">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {currentStreak}
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Day Streak
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
